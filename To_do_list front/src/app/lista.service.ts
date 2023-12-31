import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from './tarea';
import { Observable, Subject } from 'rxjs';
import { TareaCompletada } from './tareaCompletada';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  
  private urlTarea = "http://localhost:8080/toDo-app/tarea";
  private urlTareaCompletada = "http://localhost:8080/toDo-app/tarea-completada";
  private updateListSource = new Subject<void>();
  tarea: Tarea = new Tarea();
  tareaExiste: boolean;

  updateList$ = this.updateListSource.asObservable();

  constructor(private clientHTTP: HttpClient) { }

  obtenerListaTarea(): Observable<Tarea[]>{
    return this.clientHTTP.get<Tarea[]>(this.urlTarea);
  }

  updateList() {
    this.updateListSource.next();
  }

  obtenerListaTareasCompletadas(): Observable<TareaCompletada[]>{
    return this.clientHTTP.get<TareaCompletada[]>(this.urlTareaCompletada);
  }

  agregarTarea(nuevaTarea: Tarea): Observable<Object>{
    return this.clientHTTP.post(this.urlTarea, nuevaTarea);
  }

  agregarTareaCompletada(nuevaTareaCompletada: TareaCompletada): Observable<Object>{
    return this.clientHTTP.post(this.urlTareaCompletada, nuevaTareaCompletada)
  }

  obtenerTareaPorId(idTarea: number){
    return this.clientHTTP.get<Tarea>(`${this.urlTarea}/${idTarea}`);
  }
  
  obtenerTareaCompletadaPorId(idTareaCompletada: number){
    return this.clientHTTP.get<TareaCompletada>(`${this.urlTareaCompletada}/${idTareaCompletada}`);
  }

  eliminarTarea(idTarea: number): Observable<Object>{
    return this.clientHTTP.delete(`${this.urlTarea}/${idTarea}`);
  }

  eliminarTareaCompletada(idTareaCompletada: number): Observable<Object>{
    return this.clientHTTP.delete(`${this.urlTareaCompletada}/${idTareaCompletada}`);
  }
  
  deleteAllTaskComplete(): Observable<Object>{
    return this.clientHTTP.delete(this.urlTareaCompletada);
  }

  mandarTareaAForm(tarea: Tarea, tareaExiste: boolean){
    this.tarea = tarea;
    this.tareaExiste = tareaExiste;
  }

  editTask(idTarea: number, task: Tarea): Observable<Object>{
    return this.clientHTTP.put(`${this.urlTarea}/${idTarea}`,task);
  }
  
}
