import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class PsuApiService {
  constructor(private http: HttpService) { }

  async getStudentDetail(studentToken: string) {
    return this.http.get('https://api-gateway.psu.ac.th/Test/regist/level2/StudentDetail/token', {
      headers: {
        'credential': 'api_key=Tdgl9CSESzsdDvfZIO8YEcmnn6U0DR8F',
        'token': studentToken,
      }
    }).pipe(
      map((res) => res.data),
      map((data) => {
        return data;
      }),
    )
  }

  async getStudentImage(studentToken: string) {
    return this.http.get('https://api-gateway.psu.ac.th/Test/regist/level2/StudentImage/token', {
      headers: {
        'credential': 'api_key=Tdgl9CSESzsdDvfZIO8YEcmnn6U0DR8F',
        'token': studentToken,
      }
    }).pipe(
      map((res) => res.data),
      map((data) => {
        return data;
      }),
    )
  }
}
