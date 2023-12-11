import { Injectable } from '@angular/core';
import { Firestore, QueryConstraint, addDoc, collection, collectionData, deleteDoc, doc, docData, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  queyCollection2campos(coleccion:string,campo:string,valor:any,campo2:string,valor2:any){
    const coleccionRef=collection(this.fb,coleccion);
    const wa:QueryConstraint[] = [where(campo,"==",valor),where(campo2,"==",valor2)];
    //operador rest añade las variables como tal y no como campos
    const queryRef=query(coleccionRef,...wa);
    return collectionData(queryRef,{idField:"id"})as Observable<any[]>;
  }

  constructor(private fb:Firestore) { }
  
  getFireBase(nombreColeccion: string){
    const collecionRef = collection(this.fb, nombreColeccion);
    return collectionData(collecionRef, {idField: "id"}) as Observable<any[]>;
  }
  //Devuelve el resultado de una consulta Get de uno o varios
  getFireBasePorCampo(coleccion:string,campo:string,valor:any){
    const coleccionRef=collection(this.fb,coleccion);
    const queryRef=query(coleccionRef,where(campo,"==",valor))
    return collectionData(queryRef,{idField:"id"})as Observable<any[]>;
  }
  getFireBasePorId(nombreColeccion: string, idA:string){
    const collecionRef = doc(this.fb, nombreColeccion+"/"+idA);
    return docData(collecionRef, {idField: "id"}) as Observable<any>;
  }

  setFireBase(objeto: any, nombreColeccion: string){
    const collecionRef = collection(this.fb, nombreColeccion);
    return addDoc(collecionRef, objeto)
      .then(() => console.log("Objeto guardado"))
      .catch((error: any) => console.error(error));
  }

  // Método para hacer el update de un objeto en una coleccion
  updateFireBase(objeto: any, nombreColeccion: string, id: string) {
    const collectionRef = doc(this.fb, nombreColeccion+"/"+id);
    return setDoc(collectionRef, objeto);
  }

  deleteFireBase(objeto: any, nombreColeccion: string){
    const collectionRef = doc(this.fb, nombreColeccion+"/"+objeto.id);
    return deleteDoc(collectionRef);
  }
}
