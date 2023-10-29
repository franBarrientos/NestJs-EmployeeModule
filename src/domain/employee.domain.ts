export class EmployeeDomain {
  private id: number;

  private userId: number;

  private startDate: Date;

  private salary: number;

  private jobTitle: string;

  constructor(
    id: number,
    userId: number,
    startDate: Date,
    salary: number,
    jobTitle: string,
  ) {
    this.setId(id);
    this.setUserId(userId);
    this.setStartDate(startDate);
    this.setSalary(salary);
    this.setJobTitle(jobTitle);
  }

  public getId(): number {
    return this.id;
  }

  private setId(id: number) {
    this.id = id;
  }

  public getUserId(): number {
    return this.userId;
  }

  private setUserId(userId: number) {
    this.userId = userId;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  private setStartDate(startDate: Date) {
    this.startDate = startDate;
  }

  public getSalary(): number {
    return this.salary;
  }

  private setSalary(salary: number) {
    this.salary = salary;
  }

  public getJobTitle(): string {
    return this.jobTitle;
  }

  private setJobTitle(jobTitle: string) {
    this.jobTitle = jobTitle;
  }
}
