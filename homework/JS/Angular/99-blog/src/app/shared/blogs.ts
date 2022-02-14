export interface BlogInfoServerResponse {
    id: number;
    name: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    }
  }
  
  export interface BlogInfo {
    id: number;
    name: string;
    website: string;
    companyName: string;
    companyCatchPhrase: string;
    companyBs: string;
  }