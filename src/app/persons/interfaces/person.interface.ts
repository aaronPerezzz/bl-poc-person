export interface ResponsePerson {
  isCorrect: boolean;
  message:   string;
  response:  Person;
}

export interface ResponseListPerson {
  isCorrect: boolean;
  message:   string;
  response:  Person[];
}

export interface Person {
  id?:            number;
  name:          string;
  lastName:      string;
  email:         string;
  phone:         string;
  birthDay:      Date;
  maritalStatus: string;
}
