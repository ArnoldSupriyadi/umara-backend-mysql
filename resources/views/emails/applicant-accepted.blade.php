{{--
  ============================================================
  Compiled HTML from MJML
  Source: resources/views/emails/applicant-accepted.mjml
  Compatible with: Gmail, Outlook (2007+), Apple Mail, Yahoo, Mobile clients
  Responsive: Yes (collapses to single column on mobile)
  ============================================================
--}}
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <title>Lamaran Diterima — {{ $brandName }}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--[if mso]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

        /* Reset */
        body { background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        a { color: #1e3a8a; text-decoration: none; }

        /* Mobile responsive */
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; max-width: 100% !important; }
            .px-mobile { padding-left: 16px !important; padding-right: 16px !important; }
            .py-mobile { padding-top: 24px !important; padding-bottom: 24px !important; }
            .text-mobile-sm { font-size: 14px !important; }
            .text-mobile-lg { font-size: 20px !important; }
            .btn-mobile { width: 100% !important; }
            .btn-mobile a { display: block !important; width: 100% !important; box-sizing: border-box; }

            /* Dual logo header → stack vertikal di mobile */
            .logo-cell {
                display: block !important;
                width: 100% !important;
                border-right: none !important;
                border-bottom: 1px solid #e5e7eb !important;
                padding: 20px 0 !important;
                text-align: center !important;
            }
            .logo-cell:last-child {
                border-bottom: none !important;
            }
            .logo-cell img {
                margin: 0 auto !important;
            }
        }

        /* Dark mode hint (limited support) */
        @media (prefers-color-scheme: dark) {
            .dark-bg { background-color: #1f2937 !important; }
        }
    </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7;">

    {{-- Preview text (hidden, shown in inbox preview) --}}
    <div style="display:none; font-size:1px; color:#f4f4f7; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
        Selamat! Anda diterima sebagai {{ $jobTitle }}. Mohon lengkapi biodata Anda.
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f4f7;">
        <tr>
            <td align="center" style="padding:24px 16px;">

                <table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">

                    {{-- ====================================== --}}
                    {{-- DUAL LOGO HEADER                         --}}
                    {{-- Kiri  : Logo Umara Group (parent)        --}}
                    {{-- Kanan : Logo brand sub-perusahaan dari   --}}
                    {{--         business_units table              --}}
                    {{-- Mobile: stacked vertically                --}}
                    {{-- ====================================== --}}
                    <tr>
                        <td class="px-mobile" align="center" style="background-color:#ffffff; padding:32px 24px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;">
                                <tr>
                                    {{-- Logo Umara Group (parent) --}}
                                    <td class="logo-cell" align="center" valign="middle" style="padding:0 24px; border-right:1px solid #e5e7eb;">
                                        <img src="{{ $parentLogoUrl }}" alt="Umara Group" width="130" height="auto" style="display:block; max-width:130px; height:auto; margin:0 auto; border:0; outline:none; text-decoration:none;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- ====================================== --}}
                    {{-- HERO BANNER                              --}}
                    {{-- ====================================== --}}
                    <tr>
                        <td class="px-mobile" align="center" style="background-color:#1e3a8a; padding:36px 24px;">
                            <h1 class="text-mobile-lg" style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:24px; font-weight:bold; color:#ffffff; text-align:center; line-height:1.3;">
                                Selamat, {{ $applicantName }}!
                            </h1>
                            <p style="margin:8px 0 0 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; color:#dbeafe; text-align:center;">
                                Lamaran Anda telah diterima
                            </p>
                        </td>
                    </tr>

                    {{-- ====================================== --}}
                    {{-- BODY CONTENT                             --}}
                    {{-- ====================================== --}}
                    <tr>
                        <td class="px-mobile py-mobile" style="background-color:#ffffff; padding:32px 24px;">

                            <p style="margin:0 0 16px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; line-height:1.6; color:#333333;">
                                Halo <strong>{{ $applicantName }}</strong>,
                            </p>

                            <p class="text-mobile-sm" style="margin:0 0 20px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:#333333;">
                                Terima kasih atas ketertarikan Anda untuk bergabung bersama <strong>{{ $brandName }}</strong>.
                                Dengan senang hati kami informasikan bahwa lamaran Anda telah
                                <strong style="color:#16a34a;">DITERIMA</strong> untuk lanjut ke tahap berikutnya.
                            </p>

                            {{-- Info Card: Role + Brand --}}
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f9fafb; border-left:4px solid #1e3a8a; border-radius:6px; margin:20px 0;">
                                <tr>
                                    <td style="padding:16px 20px;">
                                        <p style="margin:0 0 6px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px;">
                                            Posisi yang Dilamar
                                        </p>
                                        <p style="margin:0 0 14px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:18px; font-weight:bold; color:#1e3a8a; line-height:1.3;">
                                            {{ $jobTitle }}
                                        </p>
                                        <p style="margin:0 0 6px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px;">
                                            Unit Bisnis
                                        </p>
                                        <p style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; color:#374151;">
                                            {{ $brandName }}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p class="text-mobile-sm" style="margin:20px 0 16px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:#333333;">
                                Sebagai langkah selanjutnya, mohon lengkapi data biodata Anda melalui form berikut:
                            </p>

                            {{-- CTA Button --}}
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:8px 0 16px 0;">
                                <tr>
                                    <td align="center" class="btn-mobile">
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{ $biodataFormUrl }}" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="13%" stroke="f" fillcolor="#1e3a8a">
                                            <w:anchorlock/>
                                            <center style="color:#ffffff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;">Isi Form Biodata</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <!--[if !mso]><!-- -->
                                        <a href="{{ $biodataFormUrl }}" style="display:inline-block; background-color:#1e3a8a; color:#ffffff; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; font-weight:bold; text-decoration:none; padding:14px 32px; border-radius:6px; mso-hide:all;">
                                            Isi Form Biodata
                                        </a>
                                        <!--<![endif]-->
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:8px 0 0 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:12px; line-height:1.6; color:#6b7280; text-align:center;">
                                Atau salin link berikut ke browser Anda:<br>
                                <a href="{{ $biodataFormUrl }}" style="color:#1e3a8a; text-decoration:underline; word-break:break-all;">{{ $biodataFormUrl }}</a>
                            </p>

                            {{-- Divider --}}
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
                                <tr>
                                    <td style="border-top:1px solid #e5e7eb; font-size:0; line-height:0;">&nbsp;</td>
                                </tr>
                            </table>

                            {{-- Catatan Penting --}}
                            <p style="margin:0 0 8px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; font-weight:bold; color:#333333;">
                                Catatan Penting:
                            </p>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:1.8; color:#4b5563; padding:0 0 16px 0;">
                                        &bull; Mohon lengkapi form dalam waktu maksimal <strong>3 hari</strong> sejak email ini diterima.<br>
                                        &bull; Pastikan data yang diisi benar dan dapat dipertanggungjawabkan.<br>
                                        &bull; Tim HR akan menghubungi Anda untuk informasi tahap selanjutnya.
                                    </td>
                                </tr>
                            </table>

                            <p class="text-mobile-sm" style="margin:16px 0 0 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:#333333;">
                                Salam hangat,<br>
                                <strong>HR Team — Umara Group</strong>
                            </p>

                        </td>
                    </tr>

                    {{-- ====================================== --}}
                    {{-- FOOTER + NO-REPLY NOTICE                --}}
                    {{-- ====================================== --}}
                    <tr>
                        <td class="px-mobile" style="background-color:#f9fafb; padding:20px 24px; border-top:1px solid #e5e7eb;">
                            <p style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:12px; color:#6b7280; text-align:center; line-height:1.6;">
                                Email ini dikirim otomatis dari sistem rekrutmen Umara Group.<br>
                                <!-- <strong style="color:#dc2626;">Mohon JANGAN membalas email ini.</strong> -->
                            </p>
                            <p style="margin:8px 0 0 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; color:#9ca3af; text-align:center;">
                                &copy; {{ date('Y') }} Umara Group. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
