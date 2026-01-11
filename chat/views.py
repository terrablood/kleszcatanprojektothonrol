from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponseNotAllowed, HttpResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseForbidden
from django.contrib.auth.decorators import login_required
from .models import Jatek

def room(request:HttpRequest, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})

def index(request:HttpRequest):
    return render(request, 'chat/index.html', {})

@login_required
def play(request:HttpRequest, az_id:int):
    a_jatek = Jatek.objects.filter(id=az_id).first()
    if a_jatek==None: 
        return HttpResponse('Nincs ilyen azonosítóval játék!')
    return render(request, 'chat/catan.html', {'a_jatek': a_jatek})


@login_required
def ujjatek(request):
    return render(request, 'chat/ujjatek.html')

@login_required
def ujjatek_letrehozasa(request:HttpRequest):
    if request.method!='POST':
        return HttpResponseNotAllowed('esetleg nem kéne próbálkozni')
    if 'nev' not in request.POST.keys():
        return HttpResponseNotAllowed('esetleg nem kéne próbálkozni így sem')
    a_nev = request.POST['nev']
    a_jatek = Jatek.objects.filter(nev = a_nev.strip()[:100]).first()
    
    if a_jatek:
        return HttpResponseNotAllowed('Sajnálom, ilyen névvel már van játék')
    
    a_jatek = Jatek.objects.create(nev = a_nev, egyik = request.user)
    return redirect(f'/catan/play/{a_jatek.id}/')
    
    

@login_required 
def jatek_join(request:HttpRequest):
    if request.method!="POST": 
        return HttpResponseBadRequest('Ezt így nem kéne, a gombra kattints, ne linket másolj!')
    if 'jatekid' not in request.POST.keys(): 
        return HttpResponseBadRequest('Ez valami rosszindulatú próbálkozás, mert nincs jatekid kulcs!')
    
    a_jatek = Jatek.objects.filter(id=request.POST['jatekid']).first()

    if a_jatek == None: 
        return HttpResponseNotFound('Nincs ilyen játék')

    if  a_jatek.masik != None: 
        return HttpResponseForbidden('Lassú vagy, ezt már elhappolták')

    a_jatek.masik = request.user 
    a_jatek.save()

    return redirect(f'/catan/play/{a_jatek.id}/')

@login_required
def jatekok(request:HttpRequest):
    jatekok = Jatek.objects.filter(nyertes=None, masik=None)
    return render(request, 'chat/jatekok.html', {'jatekok': jatekok})







