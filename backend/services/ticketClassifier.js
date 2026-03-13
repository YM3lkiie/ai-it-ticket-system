function classifyTicket(text) {

    const message = text.toLowerCase();

    let category = "General";
    let priority = "Low";
    
    if(message.includes("wifi") || message.includes("network") || message.includes("internet")) {
        category = "Network";
        priority = "High";
    }

    if(message.includes("email") || message.includes("outlook") || message.includes("mail")) {
        category = "Email";
        priority = "Medium";  
    }

    if(message.includes("password") || message.includes("login") || message.includes("account")) {
        category = "Access";
        priority = "High";
    }

    if(message.includes("printer") || message.includes("print")) {
        category = "Hardware";
        priority = "Low";
    }

    if(message.includes("access")) {
        category = "Request for Access";
        priority = "Medium"
    }

    return{
        category,
        priority
    };
}

module.exports = classifyTicket;