# mysite/urls.py
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import include, path
from app_reg.views import regisztracio, pelda1, pelda2

urlpatterns = [
    
    path("catan/", include("chat.urls")),
    path("admin/", admin.site.urls),
    path('regisztracio/', include('app_reg.urls')),
    path('accounts/profile/', lambda request : redirect('/catan/')),
    path('accounts/', include('django.contrib.auth.urls')),
]



