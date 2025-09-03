// ====================================
// SHARED DATA MANAGER
// Sistema de gerenciamento de dados compartilhados
// ====================================

// Chaves para localStorage
const STORAGE_KEYS = {
    CLINIC_DATA: 'chatbot_clinic_data',
    PROCEDURES: 'chatbot_procedures',
    APPOINTMENTS: 'chatbot_appointments',
    MESSAGES: 'chatbot_messages',
    SETTINGS: 'chatbot_settings'
};

// ====================================
// DADOS PADRÃO DA CLÍNICA
// ====================================
const DEFAULT_CLINIC_DATA = {
    name: "Clínica Bella Estética",
    phone: "(27) 99739-3920",
    address: "Rua das Flores, 123 - Centro, São Paulo - SP",
    email: "contato@bellaestética.com.br",
    website: "www.bellaestética.com.br",
    instagram: "@bellaestética",
    workingHours: {
        monday: "08:00 - 18:00",
        tuesday: "08:00 - 18:00", 
        wednesday: "08:00 - 18:00",
        thursday: "08:00 - 18:00",
        friday: "08:00 - 18:00",
        saturday: "08:00 - 14:00",
        sunday: "Fechado"
    }
};

// ====================================
// PROCEDIMENTOS PADRÃO
// ====================================
const DEFAULT_PROCEDURES = [
    {
        id: 1,
        name: "Botox",
        price: 800,
        duration: 60,
        description: "Aplicação de toxina botulínica para redução de rugas e linhas de expressão, proporcionando um aspecto mais jovem e natural.",
        benefits: [
            "Reduz rugas dinâmicas",
            "Previne formação de novas linhas",
            "Resultado natural e harmonioso",
            "Sem tempo de recuperação",
            "Efeito duradouro (4-6 meses)",
            "Melhora da autoestima"
        ],
        category: "Harmonização Facial",
        icon: "💉",
        paymentOptions: [
            "À vista com 10% desconto",
            "Cartão em até 6x sem juros",
            "PIX com desconto especial",
            "Parcelamento personalizado"
        ],
        contraindications: "Gravidez, amamentação, doenças neuromusculares, alergia à toxina botulínica",
        preparationTips: [
            "Evite álcool 24h antes",
            "Não tome anticoagulantes",
            "Informe sobre medicamentos em uso",
            "Chegue sem maquiagem na região"
        ],
        aftercareTips: [
            "Não deite por 4 horas",
            "Evite exercícios intensos por 24h",
            "Não massageie a região",
            "Retorno em 15 dias para avaliação"
        ]
    },
    {
        id: 2,
        name: "Preenchimento Labial",
        price: 1200,
        duration: 90,
        description: "Preenchimento com ácido hialurônico para aumento e definição dos lábios, criando um contorno mais harmonioso e sensual.",
        benefits: [
            "Lábios mais volumosos",
            "Contorno bem definido",
            "Hidratação profunda",
            "Resultado imediato",
            "Aspecto natural",
            "Autoestima elevada"
        ],
        category: "Harmonização Facial",
        icon: "💋",
        paymentOptions: [
            "À vista com 15% desconto",
            "Cartão em até 8x sem juros",
            "PIX com desconto especial",
            "Combo com outros procedimentos"
        ],
        contraindications: "Herpes ativo, alergia ao ácido hialurônico, gravidez, amamentação",
        preparationTips: [
            "Evite álcool 48h antes",
            "Não use anticoagulantes",
            "Trate herpes se necessário",
            "Hidrate bem os lábios"
        ],
        aftercareTips: [
            "Aplique gelo nas primeiras horas",
            "Evite beijos por 24h",
            "Use protetor labial",
            "Retorno em 15 dias"
        ]
    },
    {
        id: 3,
        name: "Harmonização Facial",
        price: 2500,
        duration: 120,
        description: "Conjunto de procedimentos para harmonizar as proporções faciais, realçando a beleza natural e corrigindo assimetrias.",
        benefits: [
            "Rosto mais harmônico",
            "Correção de assimetrias",
            "Realce da beleza natural",
            "Rejuvenescimento facial",
            "Melhora do perfil",
            "Resultado personalizado"
        ],
        category: "Harmonização Facial",
        icon: "✨",
        paymentOptions: [
            "À vista com 20% desconto",
            "Cartão em até 12x",
            "PIX parcelado",
            "Plano de tratamento personalizado"
        ],
        contraindications: "Gravidez, amamentação, doenças autoimunes, infecções ativas",
        preparationTips: [
            "Consulta prévia obrigatória",
            "Exames se necessário",
            "Evite álcool 48h antes",
            "Planejamento detalhado"
        ],
        aftercareTips: [
            "Repouso nas primeiras 24h",
            "Compressas frias",
            "Evite exercícios por 48h",
            "Acompanhamento semanal"
        ]
    },
    {
        id: 4,
        name: "Limpeza de Pele Profunda",
        price: 150,
        duration: 90,
        description: "Limpeza profunda da pele com extração de cravos, hidratação e aplicação de máscara específica para seu tipo de pele.",
        benefits: [
            "Remove impurezas profundas",
            "Desobstrui os poros",
            "Pele mais lisa e macia",
            "Melhora da textura",
            "Prevenção de acne",
            "Renovação celular"
        ],
        category: "Tratamentos Faciais",
        icon: "🧴",
        paymentOptions: [
            "À vista com desconto",
            "Cartão em até 3x",
            "PIX",
            "Pacote mensal"
        ],
        contraindications: "Pele muito sensível, lesões ativas, uso de ácidos recente",
        preparationTips: [
            "Não use ácidos 3 dias antes",
            "Evite exposição solar",
            "Retire a maquiagem",
            "Informe sobre alergias"
        ],
        aftercareTips: [
            "Use protetor solar",
            "Evite maquiagem por 24h",
            "Hidrate bem a pele",
            "Retorno mensal recomendado"
        ]
    },
    {
        id: 5,
        name: "Peeling Químico",
        price: 300,
        duration: 60,
        description: "Renovação celular através de ácidos específicos, melhorando manchas, rugas finas e textura da pele.",
        benefits: [
            "Renovação celular",
            "Reduz manchas",
            "Melhora rugas finas",
            "Uniformiza o tom",
            "Estimula colágeno",
            "Pele mais jovem"
        ],
        category: "Tratamentos Faciais",
        icon: "🍃",
        paymentOptions: [
            "À vista com desconto",
            "Cartão em até 4x",
            "PIX",
            "Protocolo completo"
        ],
        contraindications: "Gravidez, amamentação, pele muito sensível, exposição solar recente",
        preparationTips: [
            "Preparação prévia da pele",
            "Evite sol por 15 dias",
            "Use protetor solar",
            "Suspenda ácidos"
        ],
        aftercareTips: [
            "Protetor solar obrigatório",
            "Hidratação intensa",
            "Evite sol por 30 dias",
            "Acompanhamento semanal"
        ]
    },
    {
        id: 6,
        name: "Massagem Relaxante",
        price: 200,
        duration: 60,
        description: "Massagem terapêutica para alívio do estresse, tensões musculares e promoção do bem-estar geral.",
        benefits: [
            "Alívio do estresse",
            "Relaxamento muscular",
            "Melhora da circulação",
            "Bem-estar geral",
            "Reduz ansiedade",
            "Melhora do sono"
        ],
        category: "Tratamentos Corporais",
        icon: "💆‍♀️",
        paymentOptions: [
            "À vista com desconto",
            "Cartão em até 3x",
            "PIX",
            "Pacote de sessões"
        ],
        contraindications: "Febre, infecções, lesões na pele, gravidez de risco",
        preparationTips: [
            "Chegue relaxado",
            "Evite refeições pesadas",
            "Comunique desconfortos",
            "Use roupas confortáveis"
        ],
        aftercareTips: [
            "Beba bastante água",
            "Evite esforços físicos",
            "Descanse bem",
            "Sessões regulares recomendadas"
        ]
    }
];

// ====================================
// MENSAGENS PADRÃO DO CHATBOT
// ====================================
const DEFAULT_MESSAGES = {
    welcome: "Olá! 😊 Bem-vindo(a) à nossa clínica! Sou sua assistente virtual e estou aqui para ajudar com informações sobre nossos procedimentos, agendamentos e muito mais! Como posso ajudá-lo hoje?",
    
    confirmation: "🎉 Agendamento realizado com sucesso! \n\nRecebemos sua solicitação e entraremos em contato em breve para confirmar a disponibilidade do horário escolhido. \n\n📱 Você também pode entrar em contato conosco pelo WhatsApp para mais informações!",
    
    hours: "🕐 **Nossos horários de funcionamento:**\n\n• Segunda a Sexta: 08:00 às 18:00\n• Sábado: 08:00 às 14:00\n• Domingo: Fechado\n\n📍 Estamos localizados na Rua das Flores, 123 - Centro, São Paulo - SP\n\n💜 Estamos sempre prontos para recebê-lo com o melhor atendimento!",
    
    procedures: "💆‍♀️ **Nossos Procedimentos:**\n\nOferecemos uma ampla gama de tratamentos estéticos para realçar sua beleza natural:\n\n✨ Harmonização Facial\n💉 Botox e Preenchimentos\n🧴 Tratamentos Faciais\n💆‍♀️ Tratamentos Corporais\n\nClique em 'Ver procedimentos' para conhecer todos os detalhes, preços e benefícios!",
    
    location: "📍 **Nossa Localização:**\n\n🏢 Clínica Bella Estética\n📮 Rua das Flores, 123 - Centro\n🌆 São Paulo - SP\n📞 (27) 99739-3920\n\n🚗 Estacionamento disponível\n🚌 Próximo ao transporte público\n♿ Acessibilidade completa\n\nVenha nos conhecer! Será um prazer recebê-lo!",
    
    contact: "📱 **Entre em contato conosco:**\n\n💬 WhatsApp: (27) 99739-3920\n📧 Email: contato@bellaestética.com.br\n🌐 Site: www.bellaestética.com.br\n📸 Instagram: @bellaestética\n\n⏰ Respondemos rapidamente em horário comercial!\n💜 Estamos ansiosos para cuidar de você!",
    
    prices: "💰 **Informações sobre Preços:**\n\nNossos valores são justos e competitivos! Oferecemos:\n\n💳 Diversas formas de pagamento\n🎁 Descontos especiais à vista\n📦 Pacotes promocionais\n💎 Planos personalizados\n\nPara valores específicos, clique em 'Ver procedimentos' ou entre em contato conosco. Temos opções para todos os orçamentos!",
    
    error: "😅 Ops! Parece que não entendi sua mensagem. \n\nPode tentar:\n• Usar os botões de ação rápida\n• Reformular sua pergunta\n• Entrar em contato pelo WhatsApp\n\nEstou aqui para ajudar! 💜"
};

// ====================================
// CONFIGURAÇÕES PADRÃO
// ====================================
const DEFAULT_SETTINGS = {
    chatbotName: "Bella Assistant",
    autoResponse: true,
    workingHoursOnly: false,
    maxAppointmentsPerDay: 20,
    appointmentDuration: 60,
    advanceBookingDays: 30,
    reminderEnabled: true,
    theme: "purple"
};

// ====================================
// GERENCIADOR DE DADOS
// ====================================
const DataManager = {
    // ====================================
    // DADOS DA CLÍNICA
    // ====================================
    getClinicData() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.CLINIC_DATA);
            return stored ? JSON.parse(stored) : DEFAULT_CLINIC_DATA;
        } catch (error) {
            console.error('Erro ao carregar dados da clínica:', error);
            return DEFAULT_CLINIC_DATA;
        }
    },
    
    setClinicData(data) {
        try {
            const validatedData = this.validateClinicData(data);
            localStorage.setItem(STORAGE_KEYS.CLINIC_DATA, JSON.stringify(validatedData));
            return true;
        } catch (error) {
            console.error('Erro ao salvar dados da clínica:', error);
            return false;
        }
    },
    
    validateClinicData(data) {
        return {
            name: data.name || DEFAULT_CLINIC_DATA.name,
            phone: data.phone || DEFAULT_CLINIC_DATA.phone,
            address: data.address || DEFAULT_CLINIC_DATA.address,
            email: data.email || DEFAULT_CLINIC_DATA.email,
            website: data.website || DEFAULT_CLINIC_DATA.website,
            instagram: data.instagram || DEFAULT_CLINIC_DATA.instagram,
            workingHours: data.workingHours || DEFAULT_CLINIC_DATA.workingHours
        };
    },

    // ====================================
    // PROCEDIMENTOS
    // ====================================
    getProcedures() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.PROCEDURES);
            return stored ? JSON.parse(stored) : DEFAULT_PROCEDURES;
        } catch (error) {
            console.error('Erro ao carregar procedimentos:', error);
            return DEFAULT_PROCEDURES;
        }
    },
    
    setProcedures(procedures) {
        try {
            const validatedProcedures = procedures.map(p => this.validateProcedure(p));
            localStorage.setItem(STORAGE_KEYS.PROCEDURES, JSON.stringify(validatedProcedures));
            return true;
        } catch (error) {
            console.error('Erro ao salvar procedimentos:', error);
            return false;
        }
    },
    
    addProcedure(procedure) {
        try {
            const procedures = this.getProcedures();
            const newProcedure = this.validateProcedure({
                ...procedure,
                id: Date.now()
            });
            procedures.push(newProcedure);
            this.setProcedures(procedures);
            return newProcedure;
        } catch (error) {
            console.error('Erro ao adicionar procedimento:', error);
            return null;
        }
    },
    
    updateProcedure(id, updatedData) {
        try {
            const procedures = this.getProcedures();
            const index = procedures.findIndex(p => p.id === id);
            if (index !== -1) {
                procedures[index] = this.validateProcedure({
                    ...procedures[index],
                    ...updatedData,
                    id: id
                });
                this.setProcedures(procedures);
                return procedures[index];
            }
            return null;
        } catch (error) {
            console.error('Erro ao atualizar procedimento:', error);
            return null;
        }
    },
    
    deleteProcedure(id) {
        try {
            const procedures = this.getProcedures();
            const filtered = procedures.filter(p => p.id !== id);
            this.setProcedures(filtered);
            return true;
        } catch (error) {
            console.error('Erro ao deletar procedimento:', error);
            return false;
        }
    },
    
    getProcedureById(id) {
        const procedures = this.getProcedures();
        return procedures.find(p => p.id === parseInt(id));
    },
    
    validateProcedure(procedure) {
        return {
            id: procedure.id || Date.now(),
            name: procedure.name || 'Procedimento',
            price: parseFloat(procedure.price) || 0,
            duration: parseInt(procedure.duration) || 60,
            description: procedure.description || '',
            benefits: Array.isArray(procedure.benefits) ? procedure.benefits : [],
            category: procedure.category || 'Outros',
            icon: procedure.icon || '✨',
            paymentOptions: Array.isArray(procedure.paymentOptions) ? procedure.paymentOptions : [],
            contraindications: procedure.contraindications || '',
            preparationTips: Array.isArray(procedure.preparationTips) ? procedure.preparationTips : [],
            aftercareTips: Array.isArray(procedure.aftercareTips) ? procedure.aftercareTips : []
        };
    },

    // ====================================
    // AGENDAMENTOS
    // ====================================
    getAppointments() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
            return [];
        }
    },
    
    setAppointments(appointments) {
        try {
            const validatedAppointments = appointments.map(a => this.validateAppointment(a));
            localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(validatedAppointments));
            return true;
        } catch (error) {
            console.error('Erro ao salvar agendamentos:', error);
            return false;
        }
    },
    
    addAppointment(appointment) {
        try {
            const appointments = this.getAppointments();
            const newAppointment = this.validateAppointment({
                ...appointment,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                status: 'agendado'
            });
            appointments.push(newAppointment);
            this.setAppointments(appointments);
            return newAppointment;
        } catch (error) {
            console.error('Erro ao adicionar agendamento:', error);
            return null;
        }
    },
    
    updateAppointmentStatus(id, status) {
        try {
            const appointments = this.getAppointments();
            const index = appointments.findIndex(a => a.id === id);
            if (index !== -1) {
                appointments[index].status = status;
                appointments[index].updatedAt = new Date().toISOString();
                this.setAppointments(appointments);
                return appointments[index];
            }
            return null;
        } catch (error) {
            console.error('Erro ao atualizar status do agendamento:', error);
            return null;
        }
    },
    
    deleteAppointment(id) {
        try {
            const appointments = this.getAppointments();
            const filtered = appointments.filter(a => a.id !== id);
            this.setAppointments(filtered);
            return true;
        } catch (error) {
            console.error('Erro ao deletar agendamento:', error);
            return false;
        }
    },
    
    validateAppointment(appointment) {
        return {
            id: appointment.id || Date.now(),
            clientName: appointment.clientName || '',
            clientPhone: appointment.clientPhone || '',
            procedure: appointment.procedure || '',
            procedureId: appointment.procedureId || null,
            procedureIcon: appointment.procedureIcon || '✨',
            date: appointment.date || '',
            time: appointment.time || '',
            duration: parseInt(appointment.duration) || 60,
            price: parseFloat(appointment.price) || 0,
            notes: appointment.notes || '',
            status: appointment.status || 'agendado',
            createdAt: appointment.createdAt || new Date().toISOString(),
            updatedAt: appointment.updatedAt || new Date().toISOString()
        };
    },

    // ====================================
    // MENSAGENS
    // ====================================
    getMessages() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
            return stored ? { ...DEFAULT_MESSAGES, ...JSON.parse(stored) } : DEFAULT_MESSAGES;
        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
            return DEFAULT_MESSAGES;
        }
    },
    
    setMessages(messages) {
        try {
            const validatedMessages = this.validateMessages(messages);
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(validatedMessages));
            return true;
        } catch (error) {
            console.error('Erro ao salvar mensagens:', error);
            return false;
        }
    },
    
    validateMessages(messages) {
        return {
            welcome: messages.welcome || DEFAULT_MESSAGES.welcome,
            confirmation: messages.confirmation || DEFAULT_MESSAGES.confirmation,
            hours: messages.hours || DEFAULT_MESSAGES.hours,
            procedures: messages.procedures || DEFAULT_MESSAGES.procedures,
            location: messages.location || DEFAULT_MESSAGES.location,
            contact: messages.contact || DEFAULT_MESSAGES.contact,
            prices: messages.prices || DEFAULT_MESSAGES.prices,
            error: messages.error || DEFAULT_MESSAGES.error
        };
    },

    // ====================================
    // CONFIGURAÇÕES
    // ====================================
    getSettings() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
            return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
        } catch (error) {
            console.error('Erro ao carregar configurações:', error);
            return DEFAULT_SETTINGS;
        }
    },
    
    setSettings(settings) {
        try {
            const validatedSettings = this.validateSettings(settings);
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(validatedSettings));
            return true;
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            return false;
        }
    },
    
    validateSettings(settings) {
        return {
            chatbotName: settings.chatbotName || DEFAULT_SETTINGS.chatbotName,
            autoResponse: Boolean(settings.autoResponse),
            workingHoursOnly: Boolean(settings.workingHoursOnly),
            maxAppointmentsPerDay: parseInt(settings.maxAppointmentsPerDay) || DEFAULT_SETTINGS.maxAppointmentsPerDay,
            appointmentDuration: parseInt(settings.appointmentDuration) || DEFAULT_SETTINGS.appointmentDuration,
            advanceBookingDays: parseInt(settings.advanceBookingDays) || DEFAULT_SETTINGS.advanceBookingDays,
            reminderEnabled: Boolean(settings.reminderEnabled),
            theme: settings.theme || DEFAULT_SETTINGS.theme
        };
    },

    // ====================================
    // UTILITÁRIOS
    // ====================================
    exportData() {
        try {
            const data = {
                clinic: this.getClinicData(),
                procedures: this.getProcedures(),
                appointments: this.getAppointments(),
                messages: this.getMessages(),
                settings: this.getSettings(),
                exportDate: new Date().toISOString()
            };
            return JSON.stringify(data, null, 2);
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            return null;
        }
    },
    
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.clinic) this.setClinicData(data.clinic);
            if (data.procedures) this.setProcedures(data.procedures);
            if (data.appointments) this.setAppointments(data.appointments);
            if (data.messages) this.setMessages(data.messages);
            if (data.settings) this.setSettings(data.settings);
            
            return true;
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            return false;
        }
    },
    
    resetToDefaults() {
        try {
            localStorage.removeItem(STORAGE_KEYS.CLINIC_DATA);
            localStorage.removeItem(STORAGE_KEYS.PROCEDURES);
            localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
            localStorage.removeItem(STORAGE_KEYS.MESSAGES);
            localStorage.removeItem(STORAGE_KEYS.SETTINGS);
            return true;
        } catch (error) {
            console.error('Erro ao resetar dados:', error);
            return false;
        }
    },
    
    getStatistics() {
        try {
            const appointments = this.getAppointments();
            const procedures = this.getProcedures();
            
            return {
                totalAppointments: appointments.length,
                pendingAppointments: appointments.filter(a => a.status === 'agendado').length,
                confirmedAppointments: appointments.filter(a => a.status === 'confirmado').length,
                completedAppointments: appointments.filter(a => a.status === 'concluido').length,
                cancelledAppointments: appointments.filter(a => a.status === 'cancelado').length,
                totalProcedures: procedures.length,
                totalRevenue: appointments
                    .filter(a => a.status === 'concluido')
                    .reduce((sum, a) => sum + (a.price || 0), 0),
                averageAppointmentValue: appointments.length > 0 
                    ? appointments.reduce((sum, a) => sum + (a.price || 0), 0) / appointments.length 
                    : 0
            };
        } catch (error) {
            console.error('Erro ao calcular estatísticas:', error);
            return {};
        }
    }
};

// ====================================
// INICIALIZAÇÃO
// ====================================
(function initializeData() {
    // Inicializa dados padrão se não existirem
    if (!localStorage.getItem(STORAGE_KEYS.CLINIC_DATA)) {
        DataManager.setClinicData(DEFAULT_CLINIC_DATA);
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.PROCEDURES)) {
        DataManager.setProcedures(DEFAULT_PROCEDURES);
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
        DataManager.setMessages(DEFAULT_MESSAGES);
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        DataManager.setSettings(DEFAULT_SETTINGS);
    }
    
    console.log('✅ Sistema de dados inicializado com sucesso!');
})();

// ====================================
// EXPORTAR PARA USO GLOBAL
// ====================================
if (typeof window !== 'undefined') {
    window.DataManager = DataManager;
    window.STORAGE_KEYS = STORAGE_KEYS;
    window.DEFAULT_CLINIC_DATA = DEFAULT_CLINIC_DATA;
    window.DEFAULT_PROCEDURES = DEFAULT_PROCEDURES;
    window.DEFAULT_MESSAGES = DEFAULT_MESSAGES;
    window.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
}