// ====================================
// SISTEMA PRINCIPAL - CLÍNICA BELLA ESTÉTICA
// Funcionalidades do Cliente e Interface
// ====================================

/**
 * ClientSystem - Sistema principal de funcionalidades
 */
const ClientSystem = {
    
    // ====================================
    // VARIÁVEIS DE ESTADO
    // ====================================
    currentProcedure: null,
    chatInitialized: false,
    typingTimeout: null,
    lastMessageTime: 0,
    
    // ====================================
    // INICIALIZAÇÃO DO SISTEMA
    // ====================================
    
    /**
     * Inicializa todo o sistema
     */
    init: function() {
        this.setupEventListeners();
        this.initializeChat();
        this.loadProcedures();
        this.setupDateRestrictions();
        this.setupPhoneFormatting();
        console.log('🚀 ClientSystem inicializado com sucesso!');
    },

    /**
     * Configura todos os event listeners
     */
    setupEventListeners: function() {
        // Enter no chat
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Fechar dropdowns ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#proceduresDropdown') && 
                !e.target.closest('button[onclick="toggleProceduresDropdown()"]')) {
                this.closeProceduresDropdown();
            }
        });

        // Escape para fechar modais
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    },

    /**
     * Configura restrições de data
     */
    setupDateRestrictions: function() {
        const dateInput = document.getElementById('appointmentDate');
        if (dateInput) {
            // Data mínima: hoje
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            
            // Data máxima: 30 dias à frente
            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + DataManager.systemConfig.bookingAdvanceDays);
            dateInput.max = maxDate.toISOString().split('T')[0];
            
            // Validar ao mudar data
            dateInput.addEventListener('change', (e) => {
                this.validateSelectedDate(e.target.value);
            });
        }
    },

    /**
     * Configura formatação automática de telefone
     */
    setupPhoneFormatting: function() {
        const phoneInput = document.getElementById('clientPhone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = DataManager.formatPhoneNumber(e.target.value);
            });
        }
    },

    // ====================================
    // SISTEMA DE CHAT
    // ====================================
    
    /**
     * Inicializa o chat com mensagem de boas-vindas
     */
    initializeChat: function() {
        if (this.chatInitialized) return;
        
        setTimeout(() => {
            this.addBotMessage(DataManager.messages.welcome);
            this.addBotMessage("Como posso ajudá-lo hoje? Você pode:");
            this.addBotMessage("• Ver nossos procedimentos\n• Agendar um atendimento\n• Tirar dúvidas sobre tratamentos\n• Obter informações de contato");
        }, 1000);
        
        this.chatInitialized = true;
    },

    /**
     * Envia mensagem do usuário
     */
    sendMessage: function() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        // Simular digitação do bot
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processUserMessage(message);
        }, 1500 + Math.random() * 1000);
    },

    /**
     * Envia mensagem rápida
     */
    sendQuickMessage: function(message) {
        this.addUserMessage(message);
        
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processUserMessage(message);
        }, 1000);
    },

    /**
     * Adiciona mensagem do usuário ao chat
     */
    addUserMessage: function(message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-end message-enter';
        
        messageDiv.innerHTML = `
            <div class="user-message">
                <div>${this.escapeHtml(message)}</div>
                <span class="message-timestamp">${this.getCurrentTime()}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    },

    /**
     * Adiciona mensagem do bot ao chat
     */
    addBotMessage: function(message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-start message-enter';
        
        messageDiv.innerHTML = `
            <div class="bot-message">
                <div>${this.formatBotMessage(message)}</div>
                <span class="message-timestamp">${this.getCurrentTime()}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    },

    /**
     * Processa mensagem do usuário e gera resposta
     */
    processUserMessage: function(message) {
        const lowerMessage = message.toLowerCase();
        
        // Saudações
        if (this.containsAny(lowerMessage, ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'])) {
            this.addBotMessage("Olá! 😊 Seja muito bem-vindo à Clínica Bella Estética! Como posso ajudá-lo hoje?");
            return;
        }
        
        // Agendamento
        if (this.containsAny(lowerMessage, ['agendar', 'agendamento', 'marcar', 'consulta', 'horário'])) {
            this.addBotMessage("Perfeito! 📅 Vou ajudá-lo a agendar seu procedimento. Clique no botão 'Agendar' abaixo ou me diga qual procedimento te interessa!");
            return;
        }
        
        // Procedimentos
        if (this.containsAny(lowerMessage, ['procedimento', 'tratamento', 'serviço', 'o que fazem', 'quais'])) {
            this.handleProceduresInquiry();
            return;
        }
        
        // Preços
        if (this.containsAny(lowerMessage, ['preço', 'valor', 'custa', 'quanto'])) {
            this.handlePriceInquiry(lowerMessage);
            return;
        }
        
        // Localização
        if (this.containsAny(lowerMessage, ['onde', 'endereço', 'localização', 'local'])) {
            this.addBotMessage(`📍 Estamos localizados em:\n${DataManager.clinicData.address}\n${DataManager.clinicData.city}\nCEP: ${DataManager.clinicData.cep}`);
            return;
        }
        
        // Horários
        if (this.containsAny(lowerMessage, ['horário', 'funcionamento', 'aberto', 'funciona'])) {
            this.addBotMessage(`🕐 Nossos horários de funcionamento:\n${DataManager.clinicData.hours}`);
            return;
        }
        
        // Contato
        if (this.containsAny(lowerMessage, ['contato', 'telefone', 'whatsapp', 'falar'])) {
            this.handleContactInquiry();
            return;
        }
        
        // Busca por procedimento específico
        const searchResults = DataManager.searchProcedures(message);
        if (searchResults.length > 0 && searchResults.length < DataManager.procedures.length) {
            this.handleSpecificProcedureSearch(searchResults);
            return;
        }
        
        // Resposta padrão
        this.addBotMessage("Entendi! 🤔 Para melhor atendê-lo, você pode:\n\n• Usar os botões de ação rápida abaixo\n• Me perguntar sobre procedimentos específicos\n• Solicitar agendamento\n• Pedir informações de contato\n\nComo posso ajudá-lo?");
    },

    /**
     * Trata consulta sobre procedimentos
     */
    handleProceduresInquiry: function() {
        const categories = DataManager.getCategories();
        let response = "✨ Oferecemos diversos procedimentos nas seguintes áreas:\n\n";
        
        categories.forEach(category => {
            const procedures = DataManager.getProceduresByCategory(category);
            response += `🔹 **${category}** (${procedures.length} procedimentos)\n`;
        });
        
        response += "\nClique em 'Ver procedimentos' no menu acima para ver todos os detalhes! 📋";
        this.addBotMessage(response);
    },

    /**
     * Trata consulta sobre preços
     */
    handlePriceInquiry: function(message) {
        // Tentar encontrar procedimento específico na mensagem
        const searchResults = DataManager.searchProcedures(message);
        
        if (searchResults.length === 1) {
            const procedure = searchResults[0];
            this.addBotMessage(`💰 O procedimento **${procedure.name}** custa ${procedure.price}.\n\nDuração: ${procedure.duration}\n\nGostaria de agendar ou saber mais detalhes?`);
        } else if (searchResults.length > 1) {
            let response = "💰 Encontrei alguns procedimentos relacionados:\n\n";
            searchResults.slice(0, 5).forEach(proc => {
                response += `• ${proc.name}: ${proc.price}\n`;
            });
            response += "\nQual procedimento específico te interessa?";
            this.addBotMessage(response);
        } else {
            const stats = DataManager.getStats();
            this.addBotMessage(`💰 Nossos preços variam conforme o procedimento:\n\nPreço médio: ${stats.averagePrice}\n\nPara valores específicos, me diga qual procedimento te interessa ou clique em 'Ver procedimentos' no menu! 📋`);
        }
    },

    /**
     * Trata consulta sobre contato
     */
    handleContactInquiry: function() {
        const clinic = DataManager.clinicData;
        this.addBotMessage(`📞 Entre em contato conosco:\n\n• **Telefone/WhatsApp:** ${clinic.phone}\n• **Email:** ${clinic.email}\n• **Instagram:** ${clinic.socialMedia.instagram}\n• **Site:** ${clinic.website}\n\nEstamos sempre prontos para atendê-lo! 😊`);
    },

    /**
     * Trata busca específica de procedimentos
     */
    handleSpecificProcedureSearch: function(results) {
        if (results.length === 1) {
            const procedure = results[0];
            let response = `✨ **${procedure.name}**\n\n`;
            response += `📝 ${procedure.description}\n`;
            response += `💰 Preço: ${procedure.price}\n`;
            response += `⏱️ Duração: ${procedure.duration}\n\n`;
            response += `**Benefícios:**\n`;
            procedure.benefits.slice(0, 3).forEach(benefit => {
                response += `• ${benefit}\n`;
            });
            response += `\nGostaria de agendar este procedimento? 📅`;
            this.addBotMessage(response);
        } else {
            let response = `Encontrei ${results.length} procedimentos relacionados:\n\n`;
            results.slice(0, 4).forEach(proc => {
                response += `🔹 **${proc.name}** - ${proc.price}\n   ${proc.description}\n\n`;
            });
            response += "Qual destes te interessa mais?";
            this.addBotMessage(response);
        }
    },

    /**
     * Mostra indicador de digitação
     */
    showTypingIndicator: function() {
        const chatMessages = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'flex justify-start';
        
        typingDiv.innerHTML = `
            <div class="bg-gray-200 rounded-2xl rounded-tl-none p-4 max-w-md">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    },

    /**
     * Esconde indicador de digitação
     */
    hideTypingIndicator: function() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    },

    // ====================================
    // SISTEMA DE PROCEDIMENTOS
    // ====================================
    
    /**
     * Carrega lista de procedimentos
     */
    loadProcedures: function() {
        const proceduresList = document.getElementById('proceduresList');
        if (!proceduresList) return;
        
        let html = '';
        const categories = DataManager.getCategories();
        
        categories.forEach(category => {
            const procedures = DataManager.getProceduresByCategory(category);
            
            html += `
                <div class="p-4 border-b border-gray-200 bg-gray-50">
                    <h4 class="font-bold text-gray-800 text-sm uppercase tracking-wide">${category}</h4>
                </div>
            `;
            
            procedures.forEach(procedure => {
                html += `
                    <div class="procedure-card" onclick="ClientSystem.selectProcedure(${procedure.id})">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center flex-1">
                                <i class="${procedure.icon} procedure-icon"></i>
                                <div>
                                    <div class="font-semibold text-gray-800">${procedure.name}</div>
                                    <div class="text-sm text-gray-600">${procedure.description}</div>
                                    <div class="text-xs text-gray-500 mt-1">⏱️ ${procedure.duration}</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="procedure-price">${procedure.price}</div>
                                <button class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-lg mt-1 hover:bg-purple-200 transition-all">
                                    Ver detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
        
        proceduresList.innerHTML = html;
    },

    /**
     * Seleciona um procedimento
     */
    selectProcedure: function(procedureId) {
        const procedure = DataManager.getProcedureById(procedureId);
        if (!procedure) return;
        
        this.currentProcedure = procedure;
        this.closeProceduresDropdown();
        this.openSchedulingModal();
        this.updateSelectedProcedureInfo();
    },

    /**
     * Atualiza informações do procedimento selecionado
     */
    updateSelectedProcedureInfo: function() {
        const infoDiv = document.getElementById('selectedProcedureInfo');
        if (!infoDiv || !this.currentProcedure) return;
        
        const procedure = this.currentProcedure;
        infoDiv.innerHTML = `
            <div class="flex items-center mb-3">
                <i class="${procedure.icon} text-2xl text-purple-600 mr-3"></i>
                <div>
                    <h4 class="font-bold text-lg text-gray-800">${procedure.name}</h4>
                    <p class="text-gray-600 text-sm">${procedure.description}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span class="font-semibold text-gray-700">💰 Preço:</span>
                    <span class="text-purple-600 font-bold ml-2">${procedure.price}</span>
                </div>
                <div>
                    <span class="font-semibold text-gray-700">⏱️ Duração:</span>
                    <span class="ml-2">${procedure.duration}</span>
                </div>
            </div>
        `;
    },

    // ====================================
    // SISTEMA DE AGENDAMENTO
    // ====================================
    
    /**
     * Abre modal de agendamento
     */
    openSchedulingModal: function() {
        const modal = document.getElementById('schedulingModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('modal-enter');
            
            // Se não há procedimento selecionado, mostrar seleção
            if (!this.currentProcedure) {
                this.showProcedureSelection();
            }
        }
    },

    /**
     * Fecha modal de agendamento
     */
    closeSchedulingModal: function() {
        const modal = document.getElementById('schedulingModal');
        if (modal) {
            modal.classList.add('hidden');
            this.clearSchedulingForm();
        }
    },

    /**
     * Mostra seleção de procedimento no modal
     */
    showProcedureSelection: function() {
        const infoDiv = document.getElementById('selectedProcedureInfo');
        if (!infoDiv) return;
        
        let html = `
            <div class="text-center">
                <i class="fas fa-spa text-3xl text-purple-600 mb-3"></i>
                <h4 class="font-bold text-lg text-gray-800 mb-2">Selecione um Procedimento</h4>
                <p class="text-gray-600 text-sm mb-4">Escolha o procedimento que deseja agendar:</p>
                <div class="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
        `;
        
        DataManager.procedures.slice(0, 6).forEach(procedure => {
            html += `
                <button onclick="ClientSystem.selectProcedureForScheduling(${procedure.id})" 
                        class="text-left p-3 border border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="${procedure.icon} text-purple-600 mr-2"></i>
                            <span class="font-medium">${procedure.name}</span>
                        </div>
                        <span class="text-purple-600 font-bold text-sm">${procedure.price}</span>
                    </div>
                </button>
            `;
        });
        
        html += `
                </div>
                <button onclick="ClientSystem.toggleProceduresDropdown()" 
                        class="mt-3 text-purple-600 text-sm hover:underline">
                    Ver todos os procedimentos
                </button>
            </div>
        `;
        
        infoDiv.innerHTML = html;
    },

    /**
     * Seleciona procedimento para agendamento
     */
    selectProcedureForScheduling: function(procedureId) {
        const procedure = DataManager.getProcedureById(procedureId);
        if (procedure) {
            this.currentProcedure = procedure;
            this.updateSelectedProcedureInfo();
        }
    },

    /**
     * Valida data selecionada
     */
    validateSelectedDate: function(date) {
        if (!DataManager.validateDate(date)) {
            this.showNotification('Data inválida! Selecione uma data futura.', 'error');
            return false;
        }
        
        if (!DataManager.isWorkingDay(date)) {
            this.showNotification('Não atendemos aos domingos. Selecione outro dia.', 'warning');
            return false;
        }
        
        // Atualizar horários disponíveis
        this.updateAvailableTimes(date);
        return true;
    },

    /**
     * Atualiza horários disponíveis para a data
     */
    updateAvailableTimes: function(date) {
        const timeSelect = document.getElementById('appointmentTime');
        if (!timeSelect) return;
        
        const availableTimes = DataManager.getAvailableTimesForDate(date);
        
        timeSelect.innerHTML = '<option value="">Selecione um horário</option>';
        
        availableTimes.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = DataManager.formatTime(time);
            timeSelect.appendChild(option);
        });
        
        if (availableTimes.length === 0) {
            timeSelect.innerHTML = '<option value="">Nenhum horário disponível</option>';
            this.showNotification('Não há horários disponíveis para esta data.', 'warning');
        }
    },

    /**
     * Confirma agendamento
     */
    confirmScheduling: function() {
        const formData = this.getSchedulingFormData();
        
        if (!this.validateSchedulingForm(formData)) {
            return;
        }
        
        // Criar agendamento
        const appointment = {
            procedure: this.currentProcedure,
            clientName: formData.clientName,
            clientPhone: formData.clientPhone,
            date: formData.date,
            time: formData.time,
            notes: formData.notes
        };
        
        // Salvar agendamento
        const savedAppointment = DataManager.addAppointment(appointment);
        
        // Fechar modal de agendamento
        this.closeSchedulingModal();
        
        // Mostrar sucesso
        this.showSuccessModal(savedAppointment);
        
        // Adicionar mensagem no chat
        this.addBotMessage(`🎉 Agendamento confirmado!\n\n📅 ${DataManager.formatDate(formData.date)} às ${DataManager.formatTime(formData.time)}\n✨ ${this.currentProcedure.name}\n👤 ${formData.clientName}\n\nEm breve entraremos em contato para confirmar!`);
    },

    /**
     * Obtém dados do formulário de agendamento
     */
    getSchedulingFormData: function() {
        return {
            clientName: document.getElementById('clientName')?.value.trim() || '',
            clientPhone: document.getElementById('clientPhone')?.value.trim() || '',
            date: document.getElementById('appointmentDate')?.value || '',
            time: document.getElementById('appointmentTime')?.value || '',
            notes: document.getElementById('appointmentNotes')?.value.trim() || ''
        };
    },

    /**
     * Valida formulário de agendamento
     */
    validateSchedulingForm: function(data) {
        // Verificar procedimento selecionado
        if (!this.currentProcedure) {
            this.showNotification('Selecione um procedimento primeiro!', 'error');
            return false;
        }
        
        // Verificar campos obrigatórios
        if (!data.clientName) {
            this.showNotification('Nome é obrigatório!', 'error');
            document.getElementById('clientName')?.focus();
            return false;
        }
        
        if (!data.clientPhone) {
            this.showNotification('Telefone é obrigatório!', 'error');
            document.getElementById('clientPhone')?.focus();
            return false;
        }
        
        if (!DataManager.validatePhone(data.clientPhone)) {
            this.showNotification('Formato de telefone inválido!', 'error');
            document.getElementById('clientPhone')?.focus();
            return false;
        }
        
        if (!data.date) {
            this.showNotification('Data é obrigatória!', 'error');
            document.getElementById('appointmentDate')?.focus();
            return false;
        }
        
        if (!DataManager.validateDate(data.date)) {
            this.showNotification('Data inválida!', 'error');
            return false;
        }
        
        if (!data.time) {
            this.showNotification('Horário é obrigatório!', 'error');
            document.getElementById('appointmentTime')?.focus();
            return false;
        }
        
        if (!DataManager.isTimeAvailable(data.date, data.time)) {
            this.showNotification('Horário não disponível!', 'error');
            return false;
        }
        
        return true;
    },

    /**
     * Limpa formulário de agendamento
     */
    clearSchedulingForm: function() {
        const fields = ['clientName', 'clientPhone', 'appointmentDate', 'appointmentTime', 'appointmentNotes'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) field.value = '';
        });
        
        this.currentProcedure = null;
    },

    // ====================================
    // SISTEMA DE MODAIS
    // ====================================
    
    /**
     * Mostra modal de sucesso
     */
    showSuccessModal: function(appointment) {
        const modal = document.getElementById('successModal');
        const messageDiv = document.getElementById('successMessage');
        
        if (modal && messageDiv) {
            const procedure = appointment.procedure;
            const formattedDate = DataManager.formatDate(appointment.date);
            const formattedTime = DataManager.formatTime(appointment.time);
            
            messageDiv.innerHTML = `
                <h3 class="text-xl font-bold text-gray-800 mb-4">Agendamento Confirmado!</h3>
                <div class="text-left space-y-2">
                    <p><strong>Procedimento:</strong> ${procedure.name}</p>
                    <p><strong>Data:</strong> ${formattedDate}</p>
                    <p><strong>Horário:</strong> ${formattedTime}</p>
                    <p><strong>Cliente:</strong> ${appointment.clientName}</p>
                    <p><strong>Telefone:</strong> ${appointment.clientPhone}</p>
                </div>
                <div class="mt-4 p-3 bg-green-50 rounded-xl text-sm text-green-700">
                    <i class="fas fa-info-circle mr-2"></i>
                    Entraremos em contato em breve para confirmar seu agendamento!
                </div>
            `;
            
            modal.classList.remove('hidden');
            modal.classList.add('modal-enter');
        }
    },

    /**
     * Fecha modal de sucesso
     */
    closeSuccessModal: function() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        
        // Mostrar modal de compartilhamento
        setTimeout(() => {
            this.openSharingModal();
        }, 300);
    },

    /**
     * Abre modal de compartilhamento
     */
    openSharingModal: function() {
        const modal = document.getElementById('sharingModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('modal-enter');
        }
    },

    /**
     * Fecha modal de compartilhamento
     */
    closeSharingModal: function() {
        const modal = document.getElementById('sharingModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    },

    /**
     * Fecha todos os modais
     */
    closeAllModals: function() {
        const modals = ['schedulingModal', 'successModal', 'sharingModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('hidden');
            }
        });
    },

    // ====================================
    // SISTEMA DE COMPARTILHAMENTO
    // ====================================
    
    /**
     * Compartilha no WhatsApp do cliente
     */
    shareToClientWhatsApp: function() {
        const lastAppointment = DataManager.appointments[DataManager.appointments.length - 1];
        if (!lastAppointment) return;
        
        const message = this.generateAppointmentMessage(lastAppointment);
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        this.closeSharingModal();
    },

    /**
     * Copia dados do agendamento
     */
    copyAppointmentData: function() {
        const lastAppointment = DataManager.appointments[DataManager.appointments.length - 1];
        if (!lastAppointment) return;
        
        const message = this.generateAppointmentMessage(lastAppointment);
        
        navigator.clipboard.writeText(message).then(() => {
            this.showNotification('Dados copiados com sucesso!', 'success');
            this.closeSharingModal();
        }).catch(() => {
            this.showNotification('Erro ao copiar dados.', 'error');
        });
    },

    /**
     * Baixa comprovante em PDF (simulado)
     */
    downloadAppointmentPDF: function() {
        const lastAppointment = DataManager.appointments[DataManager.appointments.length - 1];
        if (!lastAppointment) return;
        
        // Simular download de PDF
        const content = this.generateAppointmentMessage(lastAppointment);
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `agendamento-${lastAppointment.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Comprovante baixado!', 'success');
        this.closeSharingModal();
    },

    /**
     * Compartilha nas redes sociais
     */
    shareToSocialMedia: function() {
        const message = "Acabei de agendar meu procedimento na Clínica Bella Estética! 💆‍♀️✨";
        const url = DataManager.clinicData.website;
        
        // Simular compartilhamento
        if (navigator.share) {
            navigator.share({
                title: 'Clínica Bella Estética',
                text: message,
                url: url
            });
        } else {
            // Fallback para redes sociais
            const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
            window.open(shareUrl, '_blank');
        }
        
        this.closeSharingModal();
    },

    /**
     * Gera mensagem do agendamento
     */
    generateAppointmentMessage: function(appointment) {
        const clinic = DataManager.clinicData;
        const procedure = appointment.procedure;
        const formattedDate = DataManager.formatDate(appointment.date);
        const formattedTime = DataManager.formatTime(appointment.time);
        
        return `🏥 ${clinic.name}
📅 AGENDAMENTO CONFIRMADO

✨ Procedimento: ${procedure.name}
📅 Data: ${formattedDate}
🕐 Horário: ${formattedTime}
👤 Cliente: ${appointment.clientName}
📱 Telefone: ${appointment.clientPhone}
💰 Valor: ${procedure.price}

📍 Endereço: ${clinic.address}, ${clinic.city}
📞 Contato: ${clinic.phone}

Obrigado por escolher a ${clinic.name}! 💜`;
    },

    // ====================================
    // SISTEMA DE DROPDOWN
    // ====================================
    
    /**
     * Alterna dropdown de procedimentos
     */
    toggleProceduresDropdown: function() {
        const dropdown = document.getElementById('proceduresDropdown');
        const icon = document.getElementById('dropdownIcon');
        
        if (dropdown && icon) {
            if (dropdown.classList.contains('hidden')) {
                dropdown.classList.remove('hidden');
                dropdown.classList.add('dropdown-enter');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                this.closeProceduresDropdown();
            }
        }
    },

    /**
     * Fecha dropdown de procedimentos
     */
    closeProceduresDropdown: function() {
        const dropdown = document.getElementById('proceduresDropdown');
        const icon = document.getElementById('dropdownIcon');
        
        if (dropdown && icon) {
            dropdown.classList.add('hidden');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    },

    // ====================================
    // UTILITÁRIOS
    // ====================================
    
    /**
     * Verifica se texto contém alguma das palavras
     */
    containsAny: function(text, words) {
        return words.some(word => text.includes(word));
    },

    /**
     * Escapa HTML para segurança
     */
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Formata mensagem do bot (permite markdown básico)
     */
    formatBotMessage: function(message) {
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    },

    /**
     * Obtém horário atual formatado
     */
    getCurrentTime: function() {
        return new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * Rola chat para o final
     */
    scrollToBottom: function() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    },

    /**
     * Mostra notificação
     */
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg max-w-sm notification ${type === 'error' ? 'bg-red-600' : type === 'warning' ? 'bg-yellow-600' : type === 'success' ? 'bg-green-600' : 'bg-blue-600'} text-white`;
        
        const icon = type === 'error' ? 'fa-exclamation-triangle' : 
                    type === 'warning' ? 'fa-exclamation-circle' :
                    type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${icon} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
};

// ====================================
// FUNÇÕES GLOBAIS PARA HTML
// ====================================

// Funções chamadas diretamente pelo HTML
window.validateAccess = function() {
    // Implementada no index.html
};

window.sendMessage = function() {
    ClientSystem.sendMessage();
};

window.sendQuickMessage = function(message) {
    ClientSystem.sendQuickMessage(message);
};

window.toggleProceduresDropdown = function() {
    ClientSystem.toggleProceduresDropdown();
};

window.openSchedulingModal = function() {
    ClientSystem.openSchedulingModal();
};

window.closeSchedulingModal = function() {
    ClientSystem.closeSchedulingModal();
};

window.confirmScheduling = function() {
    ClientSystem.confirmScheduling();
};

window.closeSuccessModal = function() {
    ClientSystem.closeSuccessModal();
};

window.shareToClientWhatsApp = function() {
    ClientSystem.shareToClientWhatsApp();
};

window.copyAppointmentData = function() {
    ClientSystem.copyAppointmentData();
};

window.downloadAppointmentPDF = function() {
    ClientSystem.downloadAppointmentPDF();
};

window.shareToSocialMedia = function() {
    ClientSystem.shareToSocialMedia();
};

window.closeSharingModal = function() {
    ClientSystem.closeSharingModal();
};

// ====================================
// INICIALIZAÇÃO GLOBAL
// ====================================

/**
 * Inicializa o chat (chamada do sistema de proteção)
 */
window.initializeChat = function() {
    ClientSystem.init();
};

// ====================================
// INICIALIZAÇÃO AUTOMÁTICA
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar DataManager estar pronto
    if (typeof DataManager !== 'undefined') {
        console.log('🚀 ClientSystem pronto para inicialização!');
    } else {
        console.warn('⚠️ DataManager não encontrado!');
    }
});

// ====================================
// LOG DE CARREGAMENTO
// ====================================
console.log('🔧 client.js carregado com sucesso!');
console.log('🎯 ClientSystem disponível globalmente');
console.log('✅ Sistema completo da Clínica Bella Estética pronto!');
