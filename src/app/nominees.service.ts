import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Nominee {
  name: string;
  position: string;
  votes: number;
}

@Injectable({
  providedIn: 'root'
})
export class NomineesService {
  // List of nominees with name, position, and votes
  private nominees: Nominee[] = [
    { name: "Ruel Ambion", position: "Elder", votes: 0 },
    { name: "Lito Ambion", position: "Elder", votes: 0 },
    { name: "Marpe Bedruz", position: "Elder", votes: 0 },
    { name: "Ronnie Carpio", position: "Elder", votes: 0 },
    { name: "Junne Reyes", position: "Elder", votes: 0 },
  
    { name: "Vener Ambat", position: "Deacon", votes: 0 },
    { name: "Gaius Ambion", position: "Deacon", votes: 0 },
    { name: "Gerald Ambion", position: "Deacon", votes: 0 },
    { name: "Lando Bayas", position: "Deacon", votes: 0 },
    { name: "Rony Javier", position: "Deacon", votes: 0 },
    { name: "Jupiter Tupas", position: "Deacon", votes: 0 },
  
    
    { name: "Lota Ambion", position: "Deaconess", votes: 0 },
    { name: "Esther Bayot", position: "Deaconess", votes: 0 },
    { name: "Neneth Caguitla", position: "Deaconess", votes: 0 },
    { name: "Lydia Garces", position: "Deaconess", votes: 0 },
    { name: "Cynthia Nazareno", position: "Deaconess", votes: 0 },
    { name: "Elsa Reyes", position: "Deaconess", votes: 0 },
    { name: "Venus Tupas", position: "Deaconess", votes: 0 },
    { name: "Jonah Villanueva", position: "Deaconess", votes: 0 },
    { name: "Vinia Villanueva", position: "Deaconess", votes: 0 },
  
    { name: "Biancamille Ambat", position: "Secretary", votes: 0 },
    { name: "Dulce Javier", position: "Secretary", votes: 0 },

    { name: "Bea Biscocho", position: "Asst. Secretary", votes: 0 },
    { name: "Myra Doce", position: "Asst. Secretary", votes: 0 },
    { name: "Margaret Javier", position: "Asst. Secretary", votes: 0 },
    { name: "Agnes Mojica", position: "Asst. Secretary", votes: 0 },
    

    { name: "Ruth Bedruz", position: "Treasurer", votes: 0 },
    
    { name: "Jenalene Ambat", position: "Asst. Treasurer", votes: 0 },
    
    { name: "Lolie Javier", position: "Auditor", votes: 0 },
    { name: "Lorraine Bayas", position: "Auditor", votes: 0 },
    
    { name: "Elaine Ambat", position: "SSD", votes: 0 }
  ];

  private nomineesSubject = new BehaviorSubject<Nominee[]>(this.nominees);

  constructor() { }

  // Get nominees
  getNominees() {
    return this.nomineesSubject.asObservable();
  }

  // Increase vote for a nominee
  increaseVote(index: number): void {
    this.nominees[index].votes++;
  }

  decreaseVote(index: number): void {
    this.nominees[index].votes--;
  }

  // Export results to CSV
  exportResults(): void {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      'Name,Position,Votes\n' +
      this.nominees.map(nominee => `${nominee.name},${nominee.position},${nominee.votes}`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'voting_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
