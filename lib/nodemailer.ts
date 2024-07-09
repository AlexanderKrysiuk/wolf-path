const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "maestro.atthost24.pl",
    port: "465",
    secure: true,
    auth: {
        user: "info@wolf-path.pl",
        pass: "mefgiv-worqeG-0hygno"
    },
});

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`

    await transporter.sendMail({
        from: "info@wolf-path.pl",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here<a/> to reset your password.</p>`
    });    
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await transporter.sendMail({
        from: "info@wolf-path.pl",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here<a/> to confirm email.</p>`
    });
};