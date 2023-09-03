import moment from 'moment';

export class LatePaymentPenalty {

    constructor() {}
    
    static manageLatePaymentPenalty(bookingDate: Date, bookReturnDate: Date, penaltyRate: number): number {
        return bookingDate > bookReturnDate ? moment.duration(moment().startOf('day').diff(bookReturnDate)).asDays() * penaltyRate : 0;
    }
}
