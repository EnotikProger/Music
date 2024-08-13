from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.index, name='index'),
    path('personal/', views.personal, name='personal'),    
    path('events/', views.events, name='events'),
    path('catalog/', views.catalog, name='catalog'),
    path('downloads/', views.downloads, name='downloads'),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
