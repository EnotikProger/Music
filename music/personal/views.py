from django.shortcuts import render

def personal(request):
    return render(request, 'personal/personal.html')

def stepList(request):
    stepList = ['Шаг 1', 'Шаг 2', 'Шаг 3', 'Шаг 4', 'Шаг 5']
    return render(request, 'personal/personal.html', {'stepList': stepList})