from django.http import JsonResponse
from django.shortcuts import render

def index(request):
    return render(request, 'main/index.html')

def api_get_view(request):
    # Получаем данные из GET-запроса
    data = request.GET.dict()
    return JsonResponse(data)