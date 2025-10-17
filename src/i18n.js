import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    fa: {
        translation: {
            changeLang: "تغییر زبان به انگلیسی",
            changeName: "تغییر نام",
            newNamePlaceholder: "نام جدید ...",
            submit: "ثبت",
            // SweetAlert texts
            changeNameTitle: "تغییر نام",
            nameTooShort: "نام شما باید حداقل ۳ کاراکتر داشته باشد",
            nameChangedSuccess: "نام شما با موفقیت تغییر کرد",
            ok: "باشه",
        },
    },
    en: {
        translation: {
            changeLang: "Change language to Persian",
            changeName: "Change name",
            newNamePlaceholder: "New name...",
            submit: "Submit",
            // SweetAlert texts
            changeNameTitle: "Change Name",
            nameTooShort: "Your name must have at least 3 characters",
            nameChangedSuccess: "Your name has been changed successfully",
            ok: "OK",
        },
    },
};


i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "fa",
        fallbackLng: "fa",
        interpolation: { escapeValue: false },
    });

// change page position (rtl , ltr)
i18n.on("languageChanged", (lng) => {
    document.documentElement.dir = lng === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
});

export default i18n;