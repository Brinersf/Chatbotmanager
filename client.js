Vou criar o arquivo 5 - js/client.js, o último arquivo do sistema:

Este é o 
arquivo 5 - js/client.js
 - o último arquivo! 🎉

Características do JavaScript:

✅ 
Chat interativo
 - Mensagens em tempo real
✅ 
Sistema de agendamento
 - Formulário completo funcional
✅ 
Compartilhamento
 - WhatsApp, cópia, download
✅ 
Validações
 - Campos obrigatórios e formatos
✅ 
Animações
 - Efeitos visuais suaves
✅ 
Responsivo
 - Funciona em mobile e desktop
✅ 
Integração completa
 - Conecta com shared-data.js

Para salvar no Bloco de Notas:

Nome do arquivo: 
client.js
Tipo: "Todos os arquivos (
.
)"
🎊 
SISTEMA COMPLETO!

Todos os 5 arquivos criados:

✅ Arquivo 1: index.html
✅ Arquivo 2: admin.html
✅ Arquivo 3: css/styles.css
✅ Arquivo 4: js/shared-data.js
✅ Arquivo 5: js/client.js
Agora é só organizar as pastas e testar!
 🚀

// ====================================
// CLIENT-SIDE CHATBOT FUNCTIONALITY
// Sistema de chat interativo para clientes
// ====================================

// Variáveis globais
let currentProcedureId = null;
let chatHistory = [];
let isTyping = false;

// ====================================
// INICIALIZAÇÃO
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
    loadClinicData();
    setupEventListeners();
    displayWelcomeMessage();
    
    console.log('✅ Sistema do cliente inicializado com sucesso!');
});

// ====================================
// CONFIGURAÇÃO INICIAL
// ====================================
function initializeChat() {
    // Configurar data mínima para agendamento (hoje)
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        dateInput.min = today;
        
        // Data máxima (30 dias à frente)
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        dateInput.max = maxDate.toISOString().split('T')[0];
    }
    
    // Configurar máscara de telefone
    const phoneInput = document.getElementById('clientPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
    
    // Configurar Enter para enviar mensagem
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function loadClinicData() {
    try {
        const clinicData = DataManager.getClinicData();
        
        // Atualizar nome da clínica
        const clinicNameElements = document.querySelectorAll('#clinicName, #footerClinicName');
        clinicNameElements.forEach(element => {
            if (element) element.textContent = clinicData.name;
        });
        
        // Atualizar título da página
        document.title = `${clinicData.name} - Atendimento Online`;
        
    } catch (error) {
        console.error('Erro ao carregar dados da clínica:', error);
    }
}

function setupEventListeners() {
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('proceduresDropdown');
        const button = e.target.closest('button');
        
        if (dropdown && !dropdown.contains(e.target) && 
            (!button || !button.onclick || !button.onclick.toString().includes('toggleProceduresDropdown'))) {
            dropdown.classList.add('hidden');
            updateDropdownIcon(false);
        }
    });
    
    // Fechar modais com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// ====================================
// SISTEMA DE MENSAGENS
// ====================================
function displayWelcomeMessage() {
    const messages = DataManager.getMessages();
    addBotMessage(messages.welcome);
}

function addBotMessage(text, delay = 1000) {
    if (isTyping) return;
    
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot fade-in';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                ${formatMessage(text)}
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
        
        // Adicionar ao histórico
        chatHistory.push({
            type: 'bot',
            message: text,
            timestamp: new Date().toISOString()
        });
        
    }, delay);
}

function addUserMessage(text) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user slide-in-right';
    
    messageDiv.innerHTML = `
        <div class="message-content">
            ${formatMessage(text)}
        </div>
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Adicionar ao histórico
    chatHistory.push({
        type: 'user',
        message: text,
        timestamp: new Date().toISOString()
    });
}

function formatMessage(text) {
    // Converter quebras de linha
    text = text.replace(/\n/g, '<br>');
    
    // Converter markdown básico
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Converter links
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-blue-600 hover:underline">$1</a>');
    
    return text;
}

function showTypingIndicator() {
    if (isTyping) return;
    isTyping = true;
    
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'typing-indicator fade-in';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="bg-gray-200 rounded-2xl px-4 py-3 flex items-center">
            <span class="text-gray-600 mr-2">Digitando</span>
            <div class="loading-dots">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    isTyping = false;
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// ====================================
// ENVIO DE MENSAGENS
// ====================================
function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // Adicionar mensagem do usuário
    addUserMessage(message);
    
    // Limpar input
    input.value = '';
    
    // Processar resposta
    processUserMessage(message);
}

function sendQuickMessage(message) {
    addUserMessage(message);
    processUserMessage(message);
}

function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    const messages = DataManager.getMessages();
    
    // Detectar intenção da mensagem
    if (lowerMessage.includes('agendar') || lowerMessage.includes('marcar')) {
        addBotMessage("Perfeito! Vou te ajudar a agendar um procedimento. 📅\n\nPrimeiro, escolha o procedimento que deseja:");
        setTimeout(() => showProceduresForScheduling(), 1500);
        
    } else if (lowerMessage.includes('procedimento') || lowerMessage.includes('tratamento')) {
        addBotMessage(messages.procedures);
        setTimeout(() => loadProceduresList(), 1500);
        
    } else if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('custo')) {
        addBotMessage(messages.prices);
        
    } else if (lowerMessage.includes('localização') || lowerMessage.includes('endereço') || lowerMessage.includes('onde')) {
        addBotMessage(messages.location);
        
    } else if (lowerMessage.includes('horário') || lowerMessage.includes('funcionamento')) {
        addBotMessage(messages.hours);
        
    } else if (lowerMessage.includes('contato') || lowerMessage.includes('telefone') || lowerMessage.includes('whatsapp')) {
        addBotMessage(messages.contact);
        
    } else if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('bom dia') || 
               lowerMessage.includes('boa tarde') || lowerMessage.includes('boa noite')) {
        addBotMessage("Olá! 😊 Que bom te ver aqui! Como posso ajudá-lo hoje?");
        
    } else if (lowerMessage.includes('obrigad') || lowerMessage.includes('valeu') || lowerMessage.includes('brigad')) {
        addBotMessage("Por nada! 💜 Fico feliz em ajudar! Se precisar de mais alguma coisa, é só falar!");
        
    } else {
        // Resposta padrão para mensagens não reconhecidas
        addBotMessage(messages.error);
    }
}

// ====================================
// SISTEMA DE PROCEDIMENTOS
// ====================================
function toggleProceduresDropdown() {
    const dropdown = document.getElementById('proceduresDropdown');
    if (!dropdown) return;
    
    const isHidden = dropdown.classList.contains('hidden');
    
    if (isHidden) {
        loadProceduresList();
        dropdown.classList.remove('hidden');
        updateDropdownIcon(true);
    } else {
        dropdown.classList.add('hidden');
        updateDropdownIcon(false);
    }
}

function updateDropdownIcon(isOpen) {
    const icon = document.getElementById('dropdownIcon');
    if (icon) {
        icon.className = isOpen ? 'fas fa-chevron-down text-xs' : 'fas fa-chevron-up text-xs';
    }
}

function loadProceduresList() {
    const proceduresList = document.getElementById('proceduresList');
    if (!proceduresList) return;
    
    const procedures = DataManager.getProcedures();
    
    proceduresList.innerHTML = procedures.map(procedure => `
        <div class="procedure-item p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all"
             onclick="showProcedureDetails(${procedure.id})">
            <div class="flex items-center">
                <div class="text-3xl mr-4">${procedure.icon}</div>
                <div class="flex-1">
                    <div class="procedure-name font-semibold text-gray-800">${procedure.name}</div>
                    <div class="procedure-description text-sm text-gray-600 mb-2">${procedure.description}</div>
                    <div class="flex items-center justify-between">
                        <div class="procedure-price text-green-600 font-bold">
                            R$ ${procedure.price.toFixed(2).replace('.', ',')}
                        </div>
                        <div class="procedure-duration text-xs text-gray-500">
                            ${procedure.duration} min
                        </div>
                    </div>
                </div>
                <div class="ml-4">
                    <i class="fas fa-chevron-right text-gray-400"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function showProceduresForScheduling() {
    const procedures = DataManager.getProcedures();
    
    let proceduresText = "💆‍♀️ **Escolha seu procedimento:**\n\n";
    
    procedures.forEach((procedure, index) => {
        proceduresText += `${procedure.icon} **${procedure.name}**\n`;
        proceduresText += `💰 R$ ${procedure.price.toFixed(2).replace('.', ',')}\n`;
        proceduresText += `⏱️ ${procedure.duration} minutos\n\n`;
    });
    
    proceduresText += "Clique em 'Ver procedimentos' para mais detalhes ou me diga qual procedimento te interessa! 😊";
    
    addBotMessage(proceduresText);
}

function showProcedureDetails(procedureId) {
    const procedure = DataManager.getProcedureById(procedureId);
    if (!procedure) return;
    
    // Fechar dropdown
    const dropdown = document.getElementById('proceduresDropdown');
    if (dropdown) {
        dropdown.classList.add('hidden');
        updateDropdownIcon(false);
    }
    
    // Mostrar detalhes no chat
    let detailsText = `${procedure.icon} **${procedure.name}**\n\n`;
    detailsText += `📝 **Descrição:**\n${procedure.description}\n\n`;
    detailsText += `💰 **Preço:** R$ ${procedure.price.toFixed(2).replace('.', ',')}\n`;
    detailsText += `⏱️ **Duração:** ${procedure.duration} minutos\n\n`;
    
    if (procedure.benefits && procedure.benefits.length > 0) {
        detailsText += `✨ **Benefícios:**\n`;
        procedure.benefits.forEach(benefit => {
            detailsText += `• ${benefit}\n`;
        });
        detailsText += '\n';
    }
    
    detailsText += `Gostaria de agendar este procedimento? 😊`;
    
    addBotMessage(detailsText);
    
    // Oferecer agendamento após 2 segundos
    setTimeout(() => {
        addBotMessage(`Quer agendar o **${procedure.name}**? Clique no botão "Agendar" ou me diga "quero agendar"! 📅`);
        currentProcedureId = procedureId;
    }, 2000);
}

// ====================================
// SISTEMA DE AGENDAMENTO
// ====================================
function openSchedulingModal(procedureId = null) {
    const modal = document.getElementById('schedulingModal');
    if (!modal) return;
    
    // Se não foi passado um procedureId, usar o atual ou pedir para escolher
    if (!procedureId && !currentProcedureId) {
        addBotMessage("Primeiro, preciso saber qual procedimento você deseja agendar. Clique em 'Ver procedimentos' para escolher! 😊");
        return;
    }
    
    const selectedProcedureId = procedureId || currentProcedureId;
    const procedure = DataManager.getProcedureById(selectedProcedureId);
    
    if (!procedure) {
        addBotMessage("Ops! Não consegui encontrar esse procedimento. Pode escolher novamente? 😅");
        return;
    }
    
    // Atualizar informações do procedimento selecionado
    updateSelectedProcedureInfo(procedure);
    
    // Mostrar modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Focar no primeiro campo
    setTimeout(() => {
        const nameInput = document.getElementById('clientName');
        if (nameInput) nameInput.focus();
    }, 300);
}

function updateSelectedProcedureInfo(procedure) {
    const infoDiv = document.getElementById('selectedProcedureInfo');
    if (!infoDiv) return;
    
    infoDiv.innerHTML = `
        <div class="flex items-center mb-4">
            <div class="text-4xl mr-4">${procedure.icon}</div>
            <div>
                <h4 class="text-xl font-bold text-gray-800">${procedure.name}</h4>
                <p class="text-gray-600">${procedure.description}</p>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="bg-white p-3 rounded-xl">
                <div class="text-gray-500 text-xs">Preço</div>
                <div class="font-bold text-green-600 text-lg">R$ ${procedure.price.toFixed(2).replace('.', ',')}</div>
            </div>
            <div class="bg-white p-3 rounded-xl">
                <div class="text-gray-500 text-xs">Duração</div>
                <div class="font-bold text-blue-600 text-lg">${procedure.duration} min</div>
            </div>
        </div>
    `;
}

function closeSchedulingModal() {
    const modal = document.getElementById('schedulingModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        // Limpar formulário
        clearSchedulingForm();
    }
}

function clearSchedulingForm() {
    const form = document.querySelector('#schedulingModal form') || document.getElementById('schedulingModal');
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }
}

function confirmScheduling() {
    // Validar formulário
    const validation = validateSchedulingForm();
    if (!validation.isValid) {
        showValidationErrors(validation.errors);
        return;
    }
    
    // Coletar dados do formulário
    const appointmentData = collectAppointmentData();
    
    // Salvar agendamento
    const savedAppointment = DataManager.addAppointment(appointmentData);
    
    if (savedAppointment) {
        // Fechar modal de agendamento
        closeSchedulingModal();
        
        // Mostrar modal de sucesso
        showSuccessModal(savedAppointment);
        
        // Adicionar mensagem no chat
        const messages = DataManager.getMessages();
        addBotMessage(messages.confirmation);
        
        // Limpar procedimento atual
        currentProcedureId = null;
        
    } else {
        showError('Erro ao salvar agendamento. Tente novamente.');
    }
}

function validateSchedulingForm() {
    const errors = [];
    
    // Nome
    const name = document.getElementById('clientName')?.value.trim();
    if (!name) {
        errors.push('Nome é obrigatório');
    } else if (name.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    // Telefone
    const phone = document.getElementById('clientPhone')?.value.trim();
    if (!phone) {
        errors.push('Telefone é obrigatório');
    } else if (phone.replace(/\D/g, '').length < 10) {
        errors.push('Telefone deve ter pelo menos 10 dígitos');
    }
    
    // Data
    const date = document.getElementById('appointmentDate')?.value;
    if (!date) {
        errors.push('Data é obrigatória');
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errors.push('Data não pode ser no passado');
        }
    }
    
    // Horário
    const time = document.getElementById('appointmentTime')?.value;
    if (!time) {
        errors.push('Horário é obrigatório');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function showValidationErrors(errors) {
    const errorText = errors.join('\n• ');
    showError(`Por favor, corrija os seguintes erros:\n\n• ${errorText}`);
    
    // Destacar campos com erro
    errors.forEach(error => {
        if (error.includes('Nome')) {
            highlightField('clientName');
        } else if (error.includes('Telefone')) {
            highlightField('clientPhone');
        } else if (error.includes('Data')) {
            highlightField('appointmentDate');
        } else if (error.includes('Horário')) {
            highlightField('appointmentTime');
        }
    });
}

function highlightField(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('border-red-500', 'shake');
        setTimeout(() => {
            field.classList.remove('border-red-500', 'shake');
        }, 3000);
    }
}

function collectAppointmentData() {
    const procedure = DataManager.getProcedureById(currentProcedureId);
    
    return {
        clientName: document.getElementById('clientName')?.value.trim(),
        clientPhone: document.getElementById('clientPhone')?.value.trim(),
        procedure: procedure?.name || 'Procedimento',
        procedureId: currentProcedureId,
        procedureIcon: procedure?.icon || '✨',
        date: document.getElementById('appointmentDate')?.value,
        time: document.getElementById('appointmentTime')?.value,
        duration: procedure?.duration || 60,
        price: procedure?.price || 0,
        notes: document.getElementById('appointmentNotes')?.value.trim() || ''
    };
}

// ====================================
// SISTEMA DE SUCESSO E COMPARTILHAMENTO
// ====================================
function showSuccessModal(appointment) {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    
    if (modal && messageElement) {
        const formattedDate = formatDate(appointment.date);
        const formattedTime = appointment.time;
        
        messageElement.innerHTML = `
            <strong>Agendamento realizado com sucesso!</strong><br><br>
            
            <div class="text-left bg-gray-50 p-4 rounded-xl mt-4">
                <div class="flex items-center mb-2">
                    <span class="text-2xl mr-2">${appointment.procedureIcon}</span>
                    <strong>${appointment.procedure}</strong>
                </div>
                <div class="text-sm text-gray-600 space-y-1">
                    <div><strong>Data:</strong> ${formattedDate}</div>
                    <div><strong>Horário:</strong> ${formattedTime}</div>
                    <div><strong>Cliente:</strong> ${appointment.clientName}</div>
                    <div><strong>Telefone:</strong> ${appointment.clientPhone}</div>
                </div>
            </div>
            
            <div class="mt-4 text-sm text-gray-600">
                Entraremos em contato em breve para confirmar!<br>
                Gostaria de compartilhar os dados do agendamento?
            </div>
        `;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Salvar dados do agendamento para compartilhamento
        window.currentAppointment = appointment;
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        // Mostrar opções de compartilhamento
        setTimeout(() => {
            if (window.currentAppointment) {
                showSharingModal();
            }
        }, 500);
    }
}

function showSharingModal() {
    const modal = document.getElementById('sharingModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeSharingModal() {
    const modal = document.getElementById('sharingModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        window.currentAppointment = null;
    }
}

// ====================================
// FUNÇÕES DE COMPARTILHAMENTO
// ====================================
function shareToClientWhatsApp() {
    if (!window.currentAppointment) return;
    
    const appointment = window.currentAppointment;
    const clinicData = DataManager.getClinicData();
    
    const message = `🎉 *Agendamento Confirmado!*

${appointment.procedureIcon} *${appointment.procedure}*

📅 *Data:* ${formatDate(appointment.date)}
🕐 *Horário:* ${appointment.time}
👤 *Cliente:* ${appointment.clientName}
📱 *Telefone:* ${appointment.clientPhone}
💰 *Valor:* R$ ${appointment.price.toFixed(2).replace('.', ',')}

🏢 *${clinicData.name}*
📍 ${clinicData.address}
📞 ${clinicData.phone}

✨ Obrigado por escolher nossos serviços!`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    closeSharingModal();
}

function copyAppointmentData() {
    if (!window.currentAppointment) return;
    
    const appointment = window.currentAppointment;
    const clinicData = DataManager.getClinicData();
    
    const text = `AGENDAMENTO CONFIRMADO

Procedimento: ${appointment.procedure}
Data: ${formatDate(appointment.date)}
Horário: ${appointment.time}
Cliente: ${appointment.clientName}
Telefone: ${appointment.clientPhone}
Valor: R$ ${appointment.price.toFixed(2).replace('.', ',')}

Clínica: ${clinicData.name}
Endereço: ${clinicData.address}
Telefone: ${clinicData.phone}

Agendado em: ${formatDateTime(new Date())}`;

    navigator.clipboard.writeText(text).then(() => {
        showSuccess('Dados copiados para a área de transferência!');
        closeSharingModal();
    }).catch(() => {
        showError('Erro ao copiar dados. Tente novamente.');
    });
}

function downloadAppointmentPDF() {
    if (!window.currentAppointment) return;
    
    const appointment = window.currentAppointment;
    const clinicData = DataManager.getClinicData();
    
    const content = `COMPROVANTE DE AGENDAMENTO

${clinicData.name}
${clinicData.address}
Telefone: ${clinicData.phone}
Email: ${clinicData.email}

========================================

DADOS DO AGENDAMENTO

Procedimento: ${appointment.procedure}
Data: ${formatDate(appointment.date)}
Horário: ${appointment.time}
Duração: ${appointment.duration} minutos
Valor: R$ ${appointment.price.toFixed(2).replace('.', ',')}

DADOS DO CLIENTE

Nome: ${appointment.clientName}
Telefone: ${appointment.clientPhone}

OBSERVAÇÕES

${appointment.notes || 'Nenhuma observação especial.'}

========================================

IMPORTANTE:
- Chegue 15 minutos antes do horário
- Traga um documento com foto
- Para cancelar, avise com 24h de antecedência

Agendamento realizado em: ${formatDateTime(new Date())}
ID do Agendamento: ${appointment.id}

Obrigado por escolher nossos serviços!`;

    // Criar e baixar arquivo
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agendamento_${appointment.id}_${appointment.date.replace(/-/g, '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showSuccess('Comprovante baixado com sucesso!');
    closeSharingModal();
}

function shareToSocialMedia() {
    if (!window.currentAppointment) return;
    
    const appointment = window.currentAppointment;
    const clinicData = DataManager.getClinicData();
    
    const message = `Acabei de agendar meu ${appointment.procedure} na ${clinicData.name}! 💆‍♀️✨ 

Data: ${formatDate(appointment.date)} às ${appointment.time}

#beleza #estetica #autocuidado`;

    // Tentar usar Web Share API se disponível
    if (navigator.share) {
        navigator.share({
            title: 'Agendamento Confirmado',
            text: message,
            url: clinicData.website || window.location.href
        }).then(() => {
            closeSharingModal();
        }).catch(console.error);
    } else {
        // Fallback: copiar para área de transferência
        navigator.clipboard.writeText(message).then(() => {
            showSuccess('Texto copiado! Cole em suas redes sociais.');
            closeSharingModal();
        }).catch(() => {
            showError('Erro ao preparar compartilhamento.');
        });
    }
}

// ====================================
// UTILITÁRIOS
// ====================================
function formatPhoneNumber(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 2) {
            value = value.replace(/(\d{0,2})/, '($1');
        } else if (value.length <= 7) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    }
    
    event.target.value = value;
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDateTime(date) {
    return date.toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function closeAllModals() {
    const modals = ['schedulingModal', 'successModal', 'sharingModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });
}

// ====================================
// EVENTOS GLOBAIS
// ====================================
window.sendMessage = sendMessage;
window.sendQuickMessage = sendQuickMessage;
window.toggleProceduresDropdown = toggleProceduresDropdown;
window.showProcedureDetails = showProcedureDetails;
window.openSchedulingModal = openSchedulingModal;
window.closeSchedulingModal = closeSchedulingModal;
window.confirmScheduling = confirmScheduling;
window.closeSuccessModal = closeSuccessModal;
window.showSharingModal = showSharingModal;
window.closeSharingModal = closeSharingModal;
window.shareToClientWhatsApp = shareToClientWhatsApp;
window.copyAppointmentData = copyAppointmentData;
window.downloadAppointmentPDF = downloadAppointmentPDF;
window.shareToSocialMedia = shareToSocialMedia;

console.log('✅ Sistema de chat do cliente carregado com sucesso!');