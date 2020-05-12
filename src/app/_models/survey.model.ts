export class Survey {
    public questionId: string;
    public section: string;
    public level: string;
    public description: string;
    public response: boolean;

    public AlphaName: string;
    public State: Array<any>;
    public Details: Array<any>
    public Description: string;
    public Previous: number;
    public Current: number;

 
    constructor(AlphaName: string, State: Array<any>, Details: Array<any>, Description: string, Previous: number, Current: number) {
        this.AlphaName = AlphaName;
        this.State = State;
        this.Details = Details;
        this.Description = Description;
        this.Previous = Previous;
        this.Current = Current;
    }
 }