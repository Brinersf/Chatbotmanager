// Dados compartilhados do sistema
const DataManager = {
    // Dados da clínica
    clinicData: {
        name: "Clínica Bella Estética",
        phone: "(11) 99999-9999",
        email: "contato@bellaestética.com.br",
        address: "Rua das Flores, 123 - Centro",
        city: "São Paulo - SP",
        hours: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h"
    },

    // Procedimentos disponíveis
    procedures: [
        {
            id: 1,
            name: "Limpeza de Pele",
            category: "Facial",
            price: "R$ 120,00",
            duration: "60 min",
            description: "Limpeza profunda com extração e hidratação",
            icon: "fas fa-spa"
        },
        {
            id: 2,
            name: "Botox",
            category: "Facial",
            price: "R$ 800,00",
            duration: "30 min",
            description: "Aplicação de toxina botulínica para rugas",
            icon: "fas fa-syringe"
        },
        {
            id: 3,
            name: "Preenchimento Labial",
            category: "Facial",
            price: "R$ 600,00",
            duration: "45 min",
            description: "Preenchimento com ácido hialurônico",
            icon: "fas fa-kiss"
        },
        {
            id: 4,
            name: "Massagem Relaxante",
            category: "Corporal",
            price: "R$ 150,00",
            duration: "90 min",
            description: "Massagem terapêutica para relaxamento",
            icon: "fas fa-hands"
        },
        {
            id: 5,
            name: "Drenagem Linfática",
            category: "Corporal",
            price: "R$ 180,00",
            duration: "60 min",
            description: "Técnica para redução de inchaço",
            icon: "fas fa-water"
        }
    ],

    // Agendamentos (simulado)
    appointments: [],

    // Métodos
    getProcedureById: function(id) {
        return this.procedures.find(proc => proc.id === id);
    },

    addAppointment: function(appointment) {
        appointment.id = Date.now();
        this.appointments.push(appointment);
        return appointment;
    }
};

📄 
js/client.js

// Sistema de chat e funcionalidades do cliente
let selectedProcedure = null;

// Inicializar chat
function initializeChat() {
    displayWelcomeMessage();
    loadProceduresDropdown();
    setupEventListeners();
}

function displayWelcomeMessage() {
    const chatMessages = document.getElementById('chatMessages');
    const welcomeMessage = createBotMessage(`
        Olá! 👋 Bem-vindo à ${DataManager.clinicData.name}!
        
        Sou seu assistente virtual e estou aqui para ajudar você com:
        • 📅 Agendamentos de procedimentos
        • 💄 Informações sobre nossos serviços
        • 📍 Localização e horários
        • 📞 Contato direto
        
        Como posso te ajudar hoje?
    `);
    chatMessages.appendChild(welcomeMessage);
}

function createBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start space-x-3';
    messageDiv.innerHTML = `
        <div class="bg-purple-600 p-2 rounded-full">
            <i class="fas fa-robot text-white text-sm"></i>
        </div>
        <div class="bg-white rounded-2xl rounded-tl-none p-4 max-w-md shadow-sm">
            <p class="text-gray-800 whitespace-pre-line">${text}</p>
            <span class="text-xs text-gray-500 mt-2 block">${new Date().toLocaleTimeString()}</span>
        </div>
    `;
    return messageDiv;
}

function createUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start space-x-3 justify-end';
    messageDiv.innerHTML = `
        <div class="bg-blue-600 rounded-2xl rounded-tr-none p-4 max-w-md shadow-sm">
            <p class="text-white">${text}</p>
            <span class="text-xs text-blue-200 mt-2 block">${new Date().toLocaleTimeString()}</span>
        </div>
        <div class="bg-blue-600 p-2 rounded-full">
            <i class="fas fa-user text-white text-sm"></i>
        </div>
    `;
    return messageDiv;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Adicionar mensagem do usuário
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.appendChild(createUserMessage(message));
    
    // Limpar input
    input.value = '';
    
    // Simular resposta do bot
    setTimeout(() => {
        const response = generateBotResponse(message);
        chatMessages.appendChild(createBotMessage(response));
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendQuickMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.appendChild(createUserMessage(message));
    
    setTimeout(() => {
        const response = generateBotResponse(message);
        chatMessages.appendChild(createBotMessage(response));
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('agendar') || lowerMessage.includes('agendamento')) {
        return `Perfeito! Vou te ajudar a agendar um procedimento. 📅
        
Você pode:
• Clicar no botão "Agendar" abaixo
• Escolher um procedimento no menu "Ver procedimentos"
• Me dizer qual procedimento te interessa

Qual procedimento você gostaria de agendar?`;
    }
    
    if (lowerMessage.includes('procedimento') || lowerMessage.includes('serviço')) {
        return `Temos diversos procedimentos disponíveis! 💄✨

🔸 **Faciais:**
• Limpeza de Pele - R$ 120,00
• Botox - R$ 800,00  
• Preenchimento Labial - R$ 600,00

🔸 **Corporais:**
• Massagem Relaxante - R$ 150,00
• Drenagem Linfática - R$ 180,00

Clique em "Ver procedimentos" no menu para mais detalhes!`;
    }
    
    if (lowerMessage.includes('localização') || lowerMessage.includes('endereço')) {
        return `📍 **Nossa localização:**
${DataManager.clinicData.address}
${DataManager.clinicData.city}

Estamos em uma localização de fácil acesso, com estacionamento disponível!`;
    }
    
    if (lowerMessage.includes('horário') || lowerMessage.includes('funcionamento')) {
        return `🕐 **Horários de funcionamento:**
${DataManager.clinicData.hours}

Trabalhamos com agendamento para garantir o melhor atendimento!`;
    }
    
    if (lowerMessage.includes('contato') || lowerMessage.includes('telefone')) {
        return `📞 **Entre em contato conosco:**

• **Telefone:** ${DataManager.clinicData.phone}
• **Email:** ${DataManager.clinicData.email}
• **WhatsApp:** Disponível no mesmo número

Respondemos rapidamente! 😊`;
    }
    
    return `Entendi! 😊 Posso te ajudar com:

• 📅 **Agendamentos** - Marcar seu procedimento
• 💄 **Procedimentos** - Conhecer nossos serviços  
• 📍 **Localização** - Como chegar até nós
• 🕐 **Horários** - Quando funcionamos
• 📞 **Contato** - Falar diretamente conosco

O que você gostaria de saber?`;
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Dropdown de procedimentos
function loadProceduresDropdown() {
    const proceduresList = document.getElementById('proceduresList');
    
    DataManager.procedures.forEach(procedure => {
        const procedureDiv = document.createElement('div');
        procedureDiv.className = 'p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0';
        procedureDiv.onclick = () => selectProcedure(procedure);
        
        procedureDiv.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <i class="${procedure.icon} text-purple-600 mr-3"></i>
                    <div>
                        <h4 class="font-semibold text-gray-800">${procedure.name}</h4>
                        <p class="text-sm text-gray-600">${procedure.description}</p>
                        <div class="flex items-center mt-1 text-xs text-gray-500">
                            <i class="fas fa-clock mr-1"></i>${procedure.duration}
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-purple-600">${procedure.price}</div>
                    <div class="text-xs text-gray-500">${procedure.category}</div>
                </div>
            </div>
        `;
        
        proceduresList.appendChild(procedureDiv);
    });
}

function toggleProceduresDropdown() {
    const dropdown = document.getElementById('proceduresDropdown');
    const icon = document.getElementById('dropdownIcon');
    
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        dropdown.classList.add('hidden');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

function selectProcedure(procedure) {
    selectedProcedure = procedure;
    toggleProceduresDropdown();
    openSchedulingModal();
}

// Modais
function openSchedulingModal() {
    const modal = document.getElementById('schedulingModal');
    const procedureInfo = document.getElementById('selectedProcedureInfo');
    
    if (selectedProcedure) {
        procedureInfo.innerHTML = `
            <div class="flex items-center">
                <i class="${selectedProcedure.icon} text-purple-600 text-2xl mr-4"></i>
                <div>
                    <h4 class="font-bold text-lg">${selectedProcedure.name}</h4>
                    <p class="text-gray-600">${selectedProcedure.description}</p>
                    <div class="flex items-center mt-2 text-sm text-gray-500">
                        <span class="mr-4"><i class="fas fa-clock mr-1"></i>${selectedProcedure.duration}</span>
                        <span class="font-semibold text-purple-600">${selectedProcedure.price}</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        procedureInfo.innerHTML = `
            <div class="text-center text-gray-600">
                <i class="fas fa-calendar-plus text-3xl mb-2"></i>
                <p>Selecione um procedimento ou preencha os dados abaixo</p>
            </div>
        `;
    }
    
    modal.classList.remove('hidden');
    
    // Definir data mínima como hoje
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').min = today;
}

function closeSchedulingModal() {
    document.getElementById('schedulingModal').classList.add('hidden');
    clearSchedulingForm();
}

function clearSchedulingForm() {
    document.getElementById('clientName').value = '';
    document.getElementById('clientPhone').value = '';
    document.getElementById('appointmentDate').value = '';
    document.getElementById('appointmentTime').value = '';
    document.getElementById('appointmentNotes').value = '';
}

function confirmScheduling() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const notes = document.getElementById('appointmentNotes').value;
    
    if (!name || !phone || !date || !time) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    const appointment = {
        procedure: selectedProcedure,
        client: { name, phone },
        date,
        time,
        notes,
        createdAt: new Date()
    };
    
    DataManager.addAppointment(appointment);
    
    closeSchedulingModal();
    showSuccessModal(appointment);
}

function showSuccessModal(appointment) {
    const modal = document.getElementById('successModal');
    const message = document.getElementById('successMessage');
    
    const dateFormatted = new Date(appointment.date).toLocaleDateString('pt-BR');
    const procedureName = appointment.procedure ? appointment.procedure.name : 'Consulta';
    
    message.innerHTML = `
        <h3 class="text-xl font-bold text-green-600 mb-4">Agendamento Confirmado!</h3>
        <div class="text-left space-y-2">
            <p><strong>Procedimento:</strong> ${procedureName}</p>
            <p><strong>Cliente:</strong> ${appointment.client.name}</p>
            <p><strong>Data:</strong> ${dateFormatted}</p>
            <p><strong>Horário:</strong> ${appointment.time}</p>
            <p><strong>Telefone:</strong> ${appointment.client.phone}</p>
        </div>
        <div class="mt-4 p-3 bg-blue-50 rounded-xl text-sm text-blue-800">
            <i class="fas fa-info-circle mr-2"></i>
            Você receberá uma confirmação em breve!
        </div>
    `;
    
    modal.classList.remove('hidden');
    
    // Salvar dados para compartilhamento
    window.lastAppointment = appointment;
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.add('hidden');
    document.getElementById('sharingModal').classList.remove('hidden');
}

// Funções de compartilhamento
function shareToClientWhatsApp() {
    const appointment = window.lastAppointment;
    if (!appointment) return;
    
    const procedureName = appointment.procedure ? appointment.procedure.name : 'Consulta';
    const dateFormatted = new Date(appointment.date).toLocaleDateString('pt-BR');
    
    const message = `🎉 *Agendamento Confirmado!*

📅 *Procedimento:* ${procedureName}
👤 *Cliente:* ${appointment.client.name}
📆 *Data:* ${dateFormatted}
🕐 *Horário:* ${appointment.time}
📱 *Telefone:* ${appointment.client.phone}

📍 *Local:* ${DataManager.clinicData.address}

✨ Obrigado por escolher a ${DataManager.clinicData.name}!`;
    
    const whatsappUrl = `https://wa.me/${appointment.client.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function copyAppointmentData() {
    const appointment = window.lastAppointment;
    if (!appointment) return;
    
    const procedureName = appointment.procedure ? appointment.procedure.name : 'Consulta';
    const dateFormatted = new Date(appointment.date).toLocaleDateString('pt-BR');
    
    const text = `Agendamento Confirmado!
    
Procedimento: ${procedureName}
Cliente: ${appointment.client.name}
Data: ${dateFormatted}
Horário: ${appointment.time}
Telefone: ${appointment.client.phone}
Local: ${DataManager.clinicData.address}

${DataManager.clinicData.name}`;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Dados copiados para a área de transferência!');
    });
}

function downloadAppointmentPDF() {
    alert('📄 Funcionalidade de PDF será implementada em breve!');
}

function shareToSocialMedia() {
    alert('📱 Funcionalidade de redes sociais será implementada em breve!');
}

function closeSharingModal() {
    document.getElementById('sharingModal').classList.add('hidden');
    selectedProcedure = null;
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar o sistema ser desbloqueado
    const checkUnlock = setInterval(() => {
        if (!document.getElementById('mainContent').classList.contains('hidden')) {
            initializeChat();
            clearInterval(checkUnlock);
        }
    }, 100);
});
