import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PsuApiService {
  constructor(
    private http: HttpService,
    private usersService: UsersService
  ) { }


  async getStudentDetail(studentToken: string) {
    let studentDetail: any;
    try {
      const response = await firstValueFrom(
        this.http.get('https://api-gateway.psu.ac.th/Test/regist/level2/StudentDetailCampus/00/token', {
          headers: {
            'credential': 'api_key=Tdgl9CSESzsdDvfZIO8YEcmnn6U0DR8F',
            'token': studentToken,
          }
        })
      );

      studentDetail = response.data.data[0];
      const findStudent = await this.usersService.findByStudentId(studentDetail?.studentId);
      console.log(findStudent);

      if (findStudent) {
        const selectedProperties = {
          ...studentDetail,
          refId: findStudent.id,
          dorm: findStudent.dorm,
          dormDetail: findStudent.dormDetail,
          address: findStudent.address,
          scholarship: findStudent.scholarship,
          firstLogin: findStudent.firstLogin,
        };

        return selectedProperties;
      }
      if (!findStudent) {
        await this.usersService.create({
          studentId: studentDetail?.studentId,
          dorm: studentDetail?.dorm,
          address: studentDetail?.address,
          scholarship: studentDetail?.scholarship,
          firstLogin: true,
        });
      }
      return studentDetail;
    } catch (error) {
      console.error("Error fetching student detail:", error);
    }
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
