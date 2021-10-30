/**
 * @author 雪糕
 * @description
 */
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function question(value: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            rl.question(value, (result: string) => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    });
}
