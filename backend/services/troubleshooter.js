function suggestFix(text) {
    const message = text.toLowerCase();

    let suggestions = [];
    if(message.includes("wifi") || message.includes("netowrk") || message.includes("internet")) {
        suggestions = [
            "Restart the router",
            "Run the Windows network troubleshooter",
            "Check ethernet or WiFi adapter",
            "Verify IP configuration"
        ];
    }

    if(message.includes("email") || message.includes("outlook")) {
        suggestions = [
            "Restart Outlook",
            "Check internet connectivity",
            "Reconfigure the email account",
            "Clear Outlook cache"
        ];
    }

    if(message.includes("password") || message.includes("login")) {
        suggestions = [
            "Reset the user password",
            "Check Active Directory account status",
            "Verify MFA authentication",
            "Clear browser cache"
        ];
    }

    if(message.includes("printer")) {
        suggestions = [
            "Restart the printer",
            "Check printer queue",
            "Reconnect printer to network",
            "Reinstall printer drivers"
        ];
    }

    if (suggestions.length === 0) {
        suggestions = [
            "Restart the device",
            "Check network connectivity",
            "Contact IT support"
        ];
    }

    return suggestions;

}

module.exports = suggestFix;