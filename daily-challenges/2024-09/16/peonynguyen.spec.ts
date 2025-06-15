/**
 * # Javascript
 * ## Đề bài:
 * Chuỗi (string) là một tập hợp các ký tự nối liền nhau. Trong bài tập này, bạn sẽ viết một hàm để đảo ngược chuỗi, tức là sắp xếp các ký tự của chuỗi theo thứ tự ngược lại.
 *
 * ### Yêu cầu:
 * Viết một hàm JavaScript có tên reverseString để đảo ngược một chuỗi đầu vào.
 * Sau khi đảo ngược chuỗi, in ra kết quả.
 *
 * ## Ví dụ:
 * ### Input:
 * Chuỗi: "hello"
 *
 * ### Output:
 * Chuỗi đảo ngược: "olleh"
 * Giải thích: Chuỗi "hello" khi đảo ngược sẽ trở thành "olleh", các ký tự từ cuối chuỗi sẽ chuyển lên đầu.
 *
 * ## Gợi ý:
 * Để giải quyết bài toán này, bạn có thể:
 * - Tách chuỗi thành một mảng các ký tự bằng cách sử dụng phương thức split('').
 * - Sử dụng phương thức reverse() để đảo ngược mảng ký tự.
 * - Nối các ký tự lại thành chuỗi bằng cách sử dụng phương thức join('').
 */
import {expect, test} from "@playwright/test";
import {reverse} from "node:dns";

function reverseString(inputString: string): string {
    let newString: string = '';
    for (let i = (inputString.length - 1); i >= 0; i--) {
        newString += inputString.charAt(i);
    }
    return newString;
}

function reverseString2(inputString: string): string {
    return inputString.split('').reverse().join('');
}

test('Reverse string', () => {
    let inputString: string = 'abAB123@!';
    console.log(reverseString(inputString));
    console.log(reverseString2(inputString));
})


/**
 * # Playwright
 * Viết code automation cho test case sau (có thể sử copy code từ bài trước để code nhanh hơn)
 * - Đi tới trang: https://material.playwrightvn.com/
 * - Click vào: Bài học 1: Register Page (có đủ các element)
 * - Điền vào đầy đủ các thông tin của user
 * - Kiểm tra kết quả đúng như thông tin đã điền.
 */

type Gender = 'Male' | 'Female';
type Hobby = 'Reading' | 'Traveling' | 'Cooking';
type Interest = 'Technology' | 'Science' | 'Art' | 'Music' | 'Sports';
type Country = 'United States' | 'Canada' | 'United Kingdom' | 'Australia';


type User = {
    username: string,
    email: string,
    gender: Gender,
    hobbies: Hobby[],
    interests: Interest,
    country: Country,
    dob: string,
    profilePicture: string,
    biography: string,
    rateUs: number, // int number from 1 to 10
    favoriteColor: string,
    newsLetter: string,
    enableFeature: string,
    starRating: number, // float number from 1 to 5 with 1 decimal place, ex: 4.6
}

test('Registration Page', async ({page}) => {

    const user: User = {
        username: 'peony1',
        email: 'peony1@email.com',
        gender: 'Male',
        hobbies: ['Cooking'],
        interests: 'Sports',
        country: 'Canada',
        dob: '2000-01-01',
        profilePicture: 'daily-challenges/2024-09/16/peonynguyen.spec.ts',
        biography: 'ABC',
        rateUs: 8,
        favoriteColor: "#ffffff",
        newsLetter: 'Yes',
        enableFeature: 'Yes',
        starRating: 4.5
    }

    await test.step('Go to Register Page', async () => {
        await page.goto('https://material.playwrightvn.com');
        await page.getByRole('link', {name: 'Bài học 1: Register Page (có đủ các element)'}).click();
        await expect(page.getByRole('heading', {name: 'User Registration'})).toHaveText('User Registration');

    })

    await test.step('Fill information to the form registration', async () => {
        await page.getByLabel('Username:').click();
        await page.getByLabel('Username:').fill(user.username);
        await page.getByLabel('Email:').click();
        await page.getByLabel('Email:').fill(user.email);
        await page.getByLabel(user.gender, {exact: true}).check();
        for (let i = 0; i < user.hobbies.length; i++) {
            await page.getByLabel(user.hobbies[i]).check();
        }
        await page.getByLabel('Interests:').selectOption(user.interests);
        await page.getByLabel('Country:').selectOption(user.country);
        await page.getByLabel('Date of Birth:').fill(user.dob);
        await page.locator('//*[@id="profile"]').setInputFiles(user.profilePicture);
        await page.getByLabel('Biography:').click();
        await page.getByLabel('Biography:').fill(user.biography);
        await page.getByLabel('Rate Us:').fill(String(user.rateUs));
        await page.locator('#favcolor').fill(user.favoriteColor);
        if (user.newsLetter === 'Yes') {
            await page.getByLabel('Subscribe').check();
        }
        if (user.enableFeature === 'Yes') {
            await page.locator('#registrationForm div').filter({hasText: 'Enable Feature:'}).locator('span').check();
        }
        // await page.locator('#starRating').selectOption(String(user.starRating));

        await page.getByRole('button', {name: 'Register'}).click();
    })

    await test.step('Check data after registration', async () => {
        const xpathRow = '//tbody//tr';
        const xpathColumn = '//tbody//td';

        await expect(page.locator(xpathRow)).toHaveCount(1);
        await expect(page.locator(xpathColumn).nth(1)).toContainText(user.username);
        await expect(page.locator(xpathColumn).nth(2)).toContainText(user.email);

        await expect(page.locator(xpathColumn).nth(3)).toContainText(`Gender: ${user.gender.toLowerCase()}`);
        await expect(page.locator(xpathColumn).nth(3)).toContainText(`Hobbies: ${user.hobbies.toString().toLowerCase()}`);
        await expect(page.locator(xpathColumn).nth(3)).toContainText(`Country: ${user.country.toLowerCase()}`);
        await expect(page.locator(xpathColumn).nth(3)).toContainText(`Date of Birth: ${user.dob}`);
        await expect(page.locator(xpathColumn).nth(3)).toContainText(`Biography: ${user.biography}`);
        await expect(page.locator(xpathColumn).nth(3)).toContainText(`Rating: ${user.rateUs}`);
        await expect(page.locator(xpathColumn).nth(3)).toContainText(`Favorite Color: ${user.favoriteColor}`);
        await expect(page.locator(xpathColumn).nth(3)).toContainText(`Newsletter: ${user.newsLetter}`);
        await expect(page.locator(xpathColumn).nth(3)).toContainText(`Enable Feature: ${user.enableFeature}`);
        // await expect(page.locator(xpathColumn).nth(3)).toContainText(`Star Rating: ${user.starRating}`);
    })
})
