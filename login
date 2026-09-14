<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wedora — Login & Sign Up</title>

    <style>
        /* ---------- RESET ---------- */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            background: #fff8f5;
            color: #3b2926;
        }

        /* ---------- PAGE ---------- */
        .page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
            position: relative;
            overflow: hidden;
        }

        /* Decorative circles */
        .circle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
        }

        .circle.one {
            width: 420px;
            height: 420px;
            background: #f7d9d5;
            top: -180px;
            left: -150px;
            opacity: 0.65;
        }

        .circle.two {
            width: 330px;
            height: 330px;
            background: #ead8bd;
            bottom: -160px;
            right: -120px;
            opacity: 0.6;
        }

        /* ---------- CARD ---------- */
        .auth-card {
            width: min(100%, 1050px);
            min-height: 650px;
            background: rgba(255, 255, 255, 0.94);
            border-radius: 28px;
            overflow: hidden;
            display: grid;
            grid-template-columns: 1fr 1fr;
            box-shadow: 0 25px 70px rgba(83, 48, 43, 0.16);
            position: relative;
            z-index: 2;
        }

        /* ---------- LEFT SIDE ---------- */
        .hero {
            position: relative;
            min-height: 650px;
            padding: 55px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: white;
            overflow: hidden;

            /* Replace this URL with your wedding image */
            background:
                linear-gradient(
                    rgba(70, 38, 34, 0.42),
                    rgba(70, 38, 34, 0.65)
                ),
                url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80")
                center / cover;
        }

        .brand {
            font-family: Georgia, serif;
            font-size: 30px;
            letter-spacing: 1px;
        }

        .hero-content {
            max-width: 430px;
        }

        .hero-content .small-text {
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 3px;
            margin-bottom: 15px;
            opacity: 0.9;
        }

        .hero-content h1 {
            font-family: Georgia, serif;
            font-size: clamp(42px, 5vw, 64px);
            font-weight: 500;
            line-height: 1.05;
            margin-bottom: 20px;
        }

        .hero-content p {
            font-size: 15px;
            line-height: 1.7;
            max-width: 390px;
            opacity: 0.92;
        }

        .heart {
            font-size: 30px;
            margin-top: 25px;
        }

        /* ---------- RIGHT SIDE ---------- */
        .form-section {
            padding: 60px 65px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .form-header {
            margin-bottom: 30px;
        }

        .form-header h2 {
            font-family: Georgia, serif;
            font-size: 38px;
            font-weight: 500;
            color: #3b2926;
            margin-bottom: 8px;
        }

        .form-header p {
            color: #8b7772;
            font-size: 14px;
        }

        /* ---------- TABS ---------- */
        .tabs {
            display: flex;
            gap: 30px;
            border-bottom: 1px solid #eadedb;
            margin-bottom: 28px;
        }

        .tab {
            border: none;
            background: transparent;
            padding: 0 0 13px;
            font-size: 15px;
            font-weight: 600;
            color: #a69691;
            cursor: pointer;
            position: relative;
        }

        .tab.active {
            color: #a65d5a;
        }

        .tab.active::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: -1px;
            height: 2px;
            background: #a65d5a;
            border-radius: 5px;
        }

        /* ---------- FORM ---------- */
        .form {
            display: none;
        }

        .form.active {
            display: block;
        }

        .input-group {
            margin-bottom: 18px;
        }

        .input-group label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #594541;
        }

        .input-wrapper {
            position: relative;
        }

        .input-wrapper span {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #a99590;
            font-size: 16px;
        }

        .input-group input {
            width: 100%;
            height: 50px;
            border: 1px solid #e3d6d2;
            border-radius: 10px;
            padding: 0 15px 0 43px;
            font-size: 14px;
            outline: none;
            color: #3b2926;
            background: #fffdfc;
            transition: 0.2s ease;
        }

        .input-group input:focus {
            border-color: #b66b66;
            box-shadow: 0 0 0 3px rgba(182, 107, 102, 0.1);
        }

        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }

        .remember {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #7c6b67;
            font-size: 13px;
        }

        .remember input {
            accent-color: #a65d5a;
        }

        .forgot {
            color: #a65d5a;
            font-size: 13px;
            text-decoration: none;
        }

        /* ---------- BUTTON ---------- */
        .submit-btn {
            width: 100%;
            height: 52px;
            margin-top: 24px;
            border: none;
            border-radius: 10px;
            background: #a65d5a;
            color: white;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.25s ease;
        }

        .submit-btn:hover {
            background: #8f4d4a;
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(166, 93, 90, 0.22);
        }

        /* ---------- DIVIDER ---------- */
        .divider {
            display: flex;
            align-items: center;
            gap: 15px;
            margin: 25px 0;
            color: #b3a29e;
            font-size: 12px;
        }

        .divider::before,
        .divider::after {
            content: "";
            height: 1px;
            flex: 1;
            background: #eadedb;
        }

        /* ---------- SOCIAL ---------- */
        .social-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .social-btn {
            height: 48px;
            border: 1px solid #e3d6d2;
            border-radius: 10px;
            background: white;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            color: #5c4b47;
            transition: 0.2s ease;
        }

        .social-btn:hover {
            background: #fff8f5;
            border-color: #cdb8b3;
        }

        /* ---------- TERMS ---------- */
        .terms {
            margin-top: 22px;
            color: #998783;
            font-size: 11px;
            line-height: 1.6;
            text-align: center;
        }

        .terms a {
            color: #a65d5a;
            text-decoration: none;
        }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 850px) {
            .auth-card {
                grid-template-columns: 1fr;
                max-width: 550px;
            }

            .hero {
                min-height: 320px;
                padding: 35px;
            }

            .hero-content h1 {
                font-size: 45px;
            }

            .form-section {
                padding: 45px 40px;
            }
        }

        @media (max-width: 500px) {
            .page {
                padding: 15px;
            }

            .auth-card {
                border-radius: 20px;
            }

            .hero {
                min-height: 280px;
                padding: 28px;
            }

            .hero-content h1 {
                font-size: 38px;
            }

            .hero-content p {
                font-size: 13px;
            }

            .brand {
                font-size: 24px;
            }

            .form-section {
                padding: 35px 25px;
            }

            .form-header h2 {
                font-size: 32px;
            }

            .social-buttons {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>

    <main class="page">

        <div class="circle one"></div>
        <div class="circle two"></div>

        <div class="auth-card">

            <!-- LEFT / HERO -->
            <section class="hero">

                <div class="brand">
                    Wedora
                </div>

                <div class="hero-content">
                    <div class="small-text">
                        Your wedding, beautifully planned
                    </div>

                    <h1>
                        Begin your<br>
                        forever.
                    </h1>

                    <p>
                        Plan, organize and celebrate every beautiful
                        moment of your wedding — all in one place.
                    </p>

                    <div class="heart">♡</div>
                </div>

            </section>


            <!-- RIGHT / FORM -->
            <section class="form-section">

                <div class="form-header">
                    <h2 id="formTitle">Welcome back</h2>
                    <p id="formSubtitle">
                        Sign in to continue planning your special day.
                    </p>
                </div>

                <!-- TABS -->
                <div class="tabs">
                    <button class="tab active" onclick="showForm('login')">
                        Login
                    </button>

                    <button class="tab" onclick="showForm('signup')">
                        Sign Up
                    </button>
                </div>


                <!-- LOGIN -->
                <form class="form active" id="loginForm">

                    <div class="input-group">
                        <label>Email Address</label>

                        <div class="input-wrapper">
                            <span>✉</span>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                            >
                        </div>
                    </div>

                    <div class="input-group">
                        <label>Password</label>

                        <div class="input-wrapper">
                            <span>●</span>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                required
                            >
                        </div>
                    </div>

                    <div class="row">

                        <label class="remember">
                            <input type="checkbox">
                            Remember me
                        </label>

                        <a href="#" class="forgot">
                            Forgot password?
                        </a>

                    </div>

                    <button class="submit-btn" type="submit">
                        Sign In
                    </button>

                </form>


                <!-- SIGN UP -->
                <form class="form" id="signupForm">

                    <div class="input-group">
                        <label>Full Name</label>

                        <div class="input-wrapper">
                            <span>♙</span>
                            <input
                                type="text"
                                placeholder="Your full name"
                                required
                            >
                        </div>
                    </div>

                    <div class="input-group">
                        <label>Email Address</label>

                        <div class="input-wrapper">
                            <span>✉</span>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                            >
                        </div>
                    </div>

                    <div class="input-group">
                        <label>Password</label>

                        <div class="input-wrapper">
                            <span>●</span>
                            <input
                                type="password"
                                placeholder="Create a password"
                                required
                            >
                        </div>
                    </div>

                    <button class="submit-btn" type="submit">
                        Create Account
                    </button>

                    <p class="terms">
                        By creating an account, you agree to our
                        <a href="#">Terms of Service</a>
                        and
                        <a href="#">Privacy Policy</a>.
                    </p>

                </form>


                <!-- SOCIAL LOGIN -->
                <div class="divider">
                    OR CONTINUE WITH
                </div>

                <div class="social-buttons">
                    <button class="social-btn">
                        Google
                    </button>

                    <button class="social-btn">
                        Apple
                    </button>
                </div>

            </section>

        </div>
    </main>


    <script>
        function showForm(type) {

            const loginForm = document.getElementById("loginForm");
            const signupForm = document.getElementById("signupForm");

            const tabs = document.querySelectorAll(".tab");

            const title = document.getElementById("formTitle");
            const subtitle = document.getElementById("formSubtitle");

            if (type === "login") {

                loginForm.classList.add("active");
                signupForm.classList.remove("active");

                tabs[0].classList.add("active");
                tabs[1].classList.remove("active");

                title.textContent = "Welcome back";
                subtitle.textContent =
                    "Sign in to continue planning your special day.";

            } else {

                signupForm.classList.add("active");
                loginForm.classList.remove("active");

                tabs[1].classList.add("active");
                tabs[0].classList.remove("active");

                title.textContent = "Create your account";
                subtitle.textContent =
                    "Start planning your dream wedding with us.";

            }
        }
    </script>

</body>
</html>
