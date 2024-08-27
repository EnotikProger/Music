from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return render(request, 'personal/indexTest.html')

# def api_get_view(request):
#     # Получаем данные из GET-запроса   
#     data = request.GET.dict()
#     return JsonResponse(data)

def personal(request):
    return render(request, 'personal/personalTest.html')

def events(request):
    return render(request, 'personal/personalEvents.html')

def catalog(request):
    return render(request, 'personal/personalCatalog.html')

def downloads(request):
    return render(request, 'personal/personalDownloads.html')

@csrf_exempt  # Чтобы отключить проверку CSRF токена, но это только для тестирования. В продакшене лучше его не отключать
def api_get_view(request):
    if request.method == 'POST':
        try:
            # Получаем данные из POST-запроса
            data = json.loads(request.body)  # Декодируем JSON в словарь Python
            # Здесь вы можете обработать данные, сохранить их в базе данных и т.д.
            return JsonResponse({'status': 'success', 'data': data})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)










