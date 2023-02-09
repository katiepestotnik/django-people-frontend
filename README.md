# Full Stack Django + React

Now its time to put it all together!

In this Lab you will be creating a Django API for our People App React FrontEnd.

## Preparation - Front End

1. Fork and clone this repository into your **unit-4** folder.
2. Run `npm install` to get download your dependencies
3. Run `npm start` to see your react app in the browser

Set aside.

<br>

## Preparation - Back End

1. Navigate to your virtual environment folder:

`cd django-env`

2. Create an outer project directory. This will hold your main project folder and all its apps.

`mkdir django-people-api`

`cd django-people-api`

4. Initialize this folder as a get repository:

`git init`

3. Now create your Django project inside:

`django-admin startproject django_people . `

4. Now create an app in the same folder:

`django-admin startapp people_api`

Example folder structure should be:

```
  - django-people-api/
    - django_people/      <- same level as people_api
      - settings.py
      - ... other files
    - people_api/         <- same level as django_people
      - migrations/
      - apps.py
      - ... other files
    - README.md
    - Pipfile
    - manage.py
    - ... other files
```

<br>

## Create Your Project Database

Create your database from the command line in your project folder:

`createdb "people"`

<br>

## Connect App to Project

Register people_api in django_people:

Open up **django_people/settings.py** and locate this code:

```py
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Our Apps
    'people_api'   # <- add your app here
]
```

<br>

Open up **django_people/settings.py** and locate this code:

```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # <- Replace sqlite3 with postgresql
        'NAME': 'people',  # <- add the name of your DB
    }
}
```

<br>

## Map people_api's URLS to django_people:

Navigate to **urls.py** inside of django_people.

Add people_api to the existing list of URL patterns.

```py
# campus_crud/urls.py
from django.urls import path, include
from django.contrib import admin

urlpatterns = [
  path('admin/', admin.site.urls),
  # Add the line below
  path('people/', include('people_api.urls'))  # <- add this line to connect people_api's URLS to project
]
```

<br>

## Create a People Model

Navigate to `models.py` inside people_api.

Add a people model schema:

```py
from django.db import models

class People(models.Model):
  name = models.CharField(max_length=100)
  image = models.CharField(max_length=100)
  title = models.CharField(max_length=100)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f'Hello my name is {self.name}, a {self.title}'
```

- [Django Models](https://docs.djangoproject.com/en/3.0/topics/db/models/)
- [Django Model Field Reference](https://docs.djangoproject.com/en/3.0/ref/models/fields/)

<br>

## Create Migration Files and Migrate Schema to Database

Triple check that your model file(s) contains all the fields you need.

**Make migration** file(s):

`python3 manage.py makemigrations`

**Migrate** those files over to the DB to generate your tables:

`python3 manage.py migrate`

[Django Migration Command Docs](https://docs.djangoproject.com/en/3.0/topics/migrations/#the-commands)

<br>

## Use The Django Shell to seed DB with People

Run this command to open the shell:

`python3 manage.py shell`

Inside the shell make new entries:

```shell
>>>  from people_api.models import People
>>>  person = People(name='Leia Organa', title='Princess', image='https://static.tvtropes.org/pmwiki/pub/images/leia_41.jpg')
>>>  person.save()
```

[Database API Command Docs](https://docs.djangoproject.com/en/3.1/topics/db/queries/)

<br>

## Install Django Rest Framework

1.  To install this package into our application run:

`pipenv install djangorestframework`

Add it to installed apps:

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework', # <-  add it here above your app
    'people_api'
]
```

<br>

## Create People Serializer

```py
from rest_framework import serializers

from .models import People

class PeopleSerializer(serializers.ModelSerializer):
  class Meta:
    model = People
    fields = '__all__'
```

- [Django Rest Framework Serializers API Documentation](https://www.django-rest-framework.org/api-guide/serializers/)
- [CDRF Docs - Serializer Class](http://www.cdrf.co/3.9/rest_framework.serializers/ModelSerializer.html)

<br>

## Create Class Based Views

Your will need the following dependencies:

```py
from rest_framework.views import APIView    # <- as super to your class
from rest_framework.response import Response  # <- to send data to the frontend
from rest_framework import status # <- to include status codes in your response

from .serializers import PeopleSerializer # <- to format data to and from the database, enforces schema
```

Create your view classes based on this **REST** structure:

```
# class (People)

#  GET     /people - index
#  POST    /people - create

# class  (PeopleDetail) - use primary key (pk) as argument to access id

#  GET     /people/:id - show
#  PUT     /people/:id - update
#  DELETE  /people/:id - delete

```

[Use this repo as a guide for reference: DJANGO CAMPUS CRUD - LIBRARY](https://git.generalassemb.ly/laurenperez-ga/django-campus-crud/blob/solution/library/views.py)

or the Official Docs

- [Django Class Based Views Tutorial](https://www.django-rest-framework.org/tutorial/3-class-based-views/)
- [Django Rest Framework Views API Documentation](https://www.django-rest-framework.org/api-guide/views/)
- [CDRF Docs - APIView Class](http://www.cdrf.co/3.9/rest_framework.views/APIView.html)

<br>

## Map URLS to our VIEWS

Create a `urls.py` file inside people_api:

`touch urls.py`

Create URL patterns for people_api:

```py
from django.urls import path
from .views import People, PeopleDetail

urlpatterns = [
    path('', People.as_view(), name='people')
    path('<int:pk>', PeopleDetail.as_view(), name='people_detail')
]
```

## Test your API with Postman

`python3 manage.py runserver`

Go to **localhost:8000/people**

Test the following:

INDEX - GET /people
CREATE - POST /people

SHOW - GET /people/id
UPDATE - PUT /people/id
DELETE - DELETE /people/id

## Connect your Frontend React APP

1. Navigate to `people-frontend/src/components/Main.jsx`

2. Here you will see a placeholder variable for an API URL.
   Enter your newly tested API - **localhost:8000/people**

3. Complete the CRUD api calls using fetch() + Django API + person id

Examples:

```js
// Index
const data = await fetch(URL).then((res) => res.json());

// Create
await fetch(URL, {
  method: "POST",
  headers: {
    "Content-Type": "Application/json",
  },
  body: JSON.stringify(person),
});

// Update
await fetch(URL + id, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(person),

// Delete
await fetch(URL + id, { method: "DELETE" });
});
```


## Test your new FullStack DJango React APP! 