import {expect, test} from "@playwright/test";

/**
 # Javascript
 ## Đề bài:
 Chỉ số BMI (Body Mass Index) là một chỉ số được sử dụng để đánh giá mức độ béo hay gầy của một người, từ đó xác định tình trạng sức khỏe của cơ thể dựa trên chiều cao và cân nặng. Công thức tính BMI như sau:

 ```
 BMI = cân nặng (kg) / (chiều cao (m) * chiều cao (m))
 ```

 ### Yêu cầu:
 - Viết một hàm JavaScript có tên `calculateBMI` để tính chỉ số BMI dựa trên chiều cao (đơn vị mét) và cân nặng (đơn vị kg) của người dùng.
 - Sau khi tính toán, in ra kết quả với các phân loại theo chuẩn sau:
 - BMI < 18.5: "Gầy"
 - 18.5 <= BMI < 24.9: "Bình thường"
 - 25 <= BMI < 29.9: "Thừa cân"
 - BMI >= 30: "Béo phì"

 ## Ví dụ:
 **Input**:
 - Chiều cao: 1.75 mét
 - Cân nặng: 68 kg

 **Output**:
 - Kết quả BMI: 22.2
 - Phân loại: "Bình thường"
 **/
//Solution 1:
function calculateBMI(height: number, weight: number) {
    const bmi: number = weight / (height * height);
    let bodyType: string = '';

    if (bmi < 18.5) {
        bodyType = 'Gầy';
    } else if (bmi < 24.9) {
        bodyType = 'Bình thường';
    } else if (bmi < 29.9) {
        bodyType = 'Thừa cân';
    } else {
        bodyType = 'Béo phì';
    }

    return {
        bmi: bmi,
        bodyType: bodyType
    }
}

// Solution 2:
type BMIResult = {
    bmi: number;
    bodyType: string;
};

function calculateBMI2(height: number, weight: number): BMIResult {
    const bmi: number = weight / (height * height);
    let bodyType: string = '';

    if (bmi < 18.5) {
        bodyType = 'Gầy';
    } else if (bmi < 24.9) {
        bodyType = 'Bình thường';
    } else if (bmi < 29.9) {
        bodyType = 'Thừa cân';
    } else {
        bodyType = 'Béo phì';
    }

    return {bmi, bodyType};
}

test('Check BMI', () => {
    console.log('Solution 1:');
    const result = calculateBMI(1.75, 68);
    console.log(`- Kết quả BMI: ${result.bmi.toFixed(1)}`);
    console.log(`- Phân loại: ${result.bodyType}`);

    console.log('Solution 2:');
    const result2 = calculateBMI2(1.75, 68);
    console.log(`- Kết quả BMI: ${result2.bmi.toFixed(1)}`);
    console.log(`- Phân loại: ${result2.bodyType}`);
});

/**
 # Playwright
 ## Đề bài
 Viết code automation cho test case sau:
 - Đi tới trang: https://material.playwrightvn.com/
 - Click vào: Bài học 1: Register Page (có đủ các element)
 - Điền vào username, email. Click button register.
 - Kiểm tra kết quả có chứa username và email tương ứng

 ## Demo
 ![Demo image](../images/001-2024-09-01.gif)
 **/


test('Register Page with username and password', async ({page}) => {
    await page.goto('https://material.playwrightvn.com/');
    await page.getByRole('link', {name: 'Bài học 1: Register Page (có đủ các element)'}).click();

    const user = {
        username: 'peony1',
        email: 'peony1@email.com'
    };

    await page.getByLabel('Username:').click();
    await page.getByLabel('Username:').fill(user.username);
    await page.getByLabel('Email:').click();
    await page.getByLabel('Email:').fill(user.email);
    await page.getByRole('button', {name: 'Register'}).click();

    await expect(page.locator('//tbody//tr')).toHaveCount(1);
    await expect(page.locator('//tbody//td').nth(1)).toContainText(user.username);
    await expect(page.locator('//tbody//td').nth(2)).toContainText(user.email);
});
