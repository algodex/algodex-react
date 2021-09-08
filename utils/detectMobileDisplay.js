export default function detectMobileDisplay() {

    const match = window.matchMedia("(min-width: 996px)");

    return !match.matches
}