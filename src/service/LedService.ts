import LedRequest from '../dto/LedRequest';
import LedResponse from '../dto/LedResponse';

const api = 'http://192.168.1.108:8080/api';

export default class LedService {
  static async powerOnOffLed(status: boolean): Promise<LedResponse | null> {
    const data: LedRequest = {
      on: status,
    };
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(`${api}/action`, config);

      const body = await response.json();
      return body;
    } catch (e) {
      return null;
    }
  }

  static async getLedStatus(): Promise<LedResponse | null> {
    try {
      const response = await fetch(`${api}/status`);
      return await response.json();
    } catch (e) {
      return null;
    }
  }
}
