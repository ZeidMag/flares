import { v4 as uuidv4 } from 'uuid';

class Ticket {
  constructor(zonesList, subject, description) {
    this.id = uuidv4();
    this.zonesList = zonesList;
    this.ownerId = uuidv4();
    this.subject = subject;
    this.description = description;
    this.status = 'new';
    this.createdAt = new Date();
    this.commentsList = [];
  }
}

export default Ticket;
