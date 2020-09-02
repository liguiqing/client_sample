import axios from 'axios';

const baseApiUrl = 'api/validate';

export default class ValidateService {
  public question(messenger: string, target: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/question/${messenger}?target=${target}`)
        .then(function (res) {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public answer(messenger: string, target: string, answer: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/answer/${messenger}?target=${target}&answer=${answer}`)
        .then(function (res) {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
