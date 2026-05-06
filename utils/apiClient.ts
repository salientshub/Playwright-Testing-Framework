// utils/apiClient.ts
import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
    private request: APIRequestContext;
    private baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string = 'https://demoqa.com/BookStore/v1') {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    async getBooks(): Promise<APIResponse> {
        return await this.request.get(`${this.baseUrl}/Books`);
    }

    async getBook(isbn: string): Promise<APIResponse> {
        return await this.request.get(`${this.baseUrl}/Book?ISBN=${isbn}`);
    }

    async generateToken(userName: string, password: string): Promise<APIResponse> {
        return await this.request.post('https://demoqa.com/Account/v1/GenerateToken', {
            data: {
                userName,
                password
            }
        });
    }

    async createUser(userName: string, password: string): Promise<APIResponse> {
        return await this.request.post('https://demoqa.com/Account/v1/User', {
            data: {
                userName,
                password
            }
        });
    }
}
