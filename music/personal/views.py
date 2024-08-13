from django.shortcuts import render

def index(request):
    return render(request, 'personal/indexTest.html')

def personal(request):
    return render(request, 'personal/personalTest.html')

def events(request):
    return render(request, 'personal/personalEvents.html')

def catalog(request):
    return render(request, 'personal/personalCatalog.html')

def downloads(request):
    return render(request, 'personal/personalDownloads.html')











