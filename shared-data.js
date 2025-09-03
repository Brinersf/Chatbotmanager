// ====================================
// SISTEMA DE DADOS COMPARTILHADOS
// Clínica Bella Estética - Atendimento Online
// ====================================

/**
 * DataManager - Gerenciador central de dados do sistema
 * Contém todas as informações da clínica, procedimentos e funcionalidades
 */
const DataManager = {
    
    // ====================================
    // DADOS DA CLÍNICA
    // ====================================
    clinicData: {
        name: "Clínica Bella Estética",
        phone: "(11) 99999-9999",
        email: "contato@bellaestética.com.br",
        website: "www.bellaestética.com.br",
        address: "Rua das Flores, 123 - Centro",
        city: "São Paulo - SP",
        cep: "01234-567",
        hours: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 14h",
        socialMedia: {
            instagram: "@bellaestética",
            facebook: "Clínica Bella Estética",
            whatsapp: "(11) 99999-9999"
        },
        specialties: [
            "Estética Facial",
            "Estética Corporal", 
            "Harmonização Facial",
            "Tratamentos Anti-idade"
        ]
    },

    // ====================================
    // PROCEDIMENTOS DISPONÍVEIS
    // ====================================
    procedures: [
        {
            id: 1,
            name: "Limpeza de Pele",
            category: "Facial",
            price: "R$ 120,00",
            duration: "60 min",
            description: "Limpeza profunda com extração e hidratação",
            icon: "fas fa-spa",
            benefits: [
                "Remove impurezas profundas",
                "Desobstrui os poros",
                "Hidrata a pele",
                "Previne acne"
            ],
            contraindications: ["Pele muito sensível", "Lesões ativas"],
            aftercare: "Evitar sol por 24h, usar protetor solar"
        },
        {
            id: 2,
            name: "Botox",
            category: "Facial",
            price: "R$ 800,00",
            duration: "30 min",
            description: "Aplicação de toxina botulínica para rugas",
            icon: "fas fa-syringe",
            benefits: [
                "Reduz rugas de expressão",
                "Previne novas rugas",
                "Resultado natural",
                "Efeito duradouro"
            ],
            contraindications: ["Gravidez", "Amamentação", "Doenças neuromusculares"],
            aftercare: "Não deitar por 4h, evitar exercícios por 24h"
        },
        {
            id: 3,
            name: "Preenchimento Labial",
            category: "Facial",
            price: "R$ 600,00",
            duration: "45 min",
            description: "Preenchimento com ácido hialurônico",
            icon: "fas fa-kiss",
            benefits: [
                "Aumenta volume dos lábios",
                "Define contorno",
                "Hidrata os lábios",
                "Resultado imediato"
            ],
            contraindications: ["Herpes ativo", "Alergia ao ácido hialurônico"],
            aftercare: "Evitar beijos por 24h, não usar batom por 6h"
        },
        {
            id: 4,
            name: "Massagem Relaxante",
            category: "Corporal",
            price: "R$ 150,00",
            duration: "90 min",
            description: "Massagem terapêutica para relaxamento",
            icon: "fas fa-hands",
            benefits: [
                "Reduz stress e tensão",
                "Melhora circulação",
                "Relaxa músculos",
                "Promove bem-estar"
            ],
            contraindications: ["Febre", "Inflamações agudas"],
            aftercare: "Beber bastante água, descansar"
        },
        {
            id: 5,
            name: "Drenagem Linfática",
            category: "Corporal",
            price: "R$ 180,00",
            duration: "60 min",
            description: "Técnica para redução de inchaço",
            icon: "fas fa-water",
            benefits: [
                "Reduz inchaço",
                "Melhora circulação",
                "Elimina toxinas",
                "Modela silhueta"
            ],
            contraindications: ["Trombose", "Infecções", "Câncer"],
            aftercare: "Beber 2L de água, evitar sal"
        },
        {
            id: 6,
            name: "Peeling Químico",
            category: "Facial",
            price: "R$ 250,00",
            duration: "45 min",
            description: "Renovação celular com ácidos",
            icon: "fas fa-leaf",
            benefits: [
                "Renova a pele",
                "Reduz manchas",
                "Melhora textura",
                "Estimula colágeno"
            ],
            contraindications: ["Pele bronzeada", "Lesões ativas"],
            aftercare: "Usar protetor solar, evitar sol por 7 dias"
        },
        {
            id: 7,
            name: "Microagulhamento",
            category: "Facial",
            price: "R$ 300,00",
            duration: "60 min",
            description: "Estímulo de colágeno natural",
            icon: "fas fa-magic",
            benefits: [
                "Estimula colágeno",
                "Reduz cicatrizes",
                "Melhora textura",
                "Rejuvenesce a pele"
            ],
            contraindications: ["Acne ativa", "Quelóides"],
            aftercare: "Não usar maquiagem por 12h, protetor solar"
        },
        {
            id: 8,
            name: "Hidrafacial",
            category: "Facial",
            price: "R$ 200,00",
            duration: "50 min",
            description: "Limpeza, esfoliação e hidratação",
            icon: "fas fa-tint",
            benefits: [
                "Limpeza profunda",
                "Hidratação intensa",
                "Pele luminosa",
                "Sem tempo de recuperação"
            ],
            contraindications: ["Pele muito sensível"],
            aftercare: "Usar hidratante, protetor solar"
        },
        {
            id: 9,
            name: "Criolipólise",
            category: "Corporal",
            price: "R$ 400,00",
            duration: "60 min",
            description: "Redução de gordura localizada",
            icon: "fas fa-snowflake",
            benefits: [
                "Reduz gordura localizada",
                "Não invasivo",
                "Sem cirurgia",
                "Resultados duradouros"
            ],
            contraindications: ["Gravidez", "Hérnias", "Crioglobulinemia"],
            aftercare: "Massagem local, beber água, exercícios"
        },
        {
            id: 10,
            name: "Radiofrequência",
            category: "Corporal",
            price: "R$ 220,00",
            duration: "45 min",
            description: "Firmeza e tonificação da pele",
            icon: "fas fa-bolt",
            benefits: [
                "Firma a pele",
                "Reduz flacidez",
                "Estimula colágeno",
                "Melhora textura"
            ],
            contraindications: ["Marcapasso", "Gravidez", "Implantes metálicos"],
            aftercare: "Hidratação, protetor solar"
        }
    ],

    // ====================================
    // AGENDAMENTOS (SIMULADO)
    // ====================================
    appointments: [],

    // ====================================
    // HORÁRIOS DISPONÍVEIS
    // ====================================
    availableHours: [
        "08:00", "09:00", "10:00", "11:00", 
        "14:00", "15:00", "16:00", "17:00"
    ],

    // ====================================
    // MÉTODOS DE BUSCA E FILTRO
    // ====================================
    
    /**
     * Busca procedimento por ID
     * @param {number} id - ID do procedimento
     * @returns {Object|null} Procedimento encontrado ou null
     */
    getProcedureById: function(id) {
        return this.procedures.find(proc => proc.id === parseInt(id)) || null;
    },

    /**
     * Busca procedimentos por categoria
     * @param {string} category - Categoria do procedimento
     * @returns {Array} Lista de procedimentos da categoria
     */
    getProceduresByCategory: function(category) {
        return this.procedures.filter(proc => 
            proc.category.toLowerCase() === category.toLowerCase()
        );
    },

    /**
     * Busca procedimentos por texto
     * @param {string} query - Texto de busca
     * @returns {Array} Lista de procedimentos encontrados
     */
    searchProcedures: function(query) {
        if (!query || query.trim() === '') return this.procedures;
        
        const lowerQuery = query.toLowerCase().trim();
        return this.procedures.filter(proc => 
            proc.name.toLowerCase().includes(lowerQuery) ||
            proc.description.toLowerCase().includes(lowerQuery) ||
            proc.category.toLowerCase().includes(lowerQuery) ||
            proc.benefits.some(benefit => benefit.toLowerCase().includes(lowerQuery))
        );
    },

    /**
     * Obtém todas as categorias disponíveis
     * @returns {Array} Lista de categorias únicas
     */
    getCategories: function() {
        return [...new Set(this.procedures.map(p => p.category))];
    },

    // ====================================
    // MÉTODOS DE AGENDAMENTO
    // ====================================
    
    /**
     * Adiciona novo agendamento
     * @param {Object} appointment - Dados do agendamento
     * @returns {Object} Agendamento criado com ID
     */
    addAppointment: function(appointment) {
        const newAppointment = {
            ...appointment,
            id: Date.now() + Math.random(), // ID único
            status: 'agendado',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.appointments.push(newAppointment);
        this.saveToStorage();
        return newAppointment;
    },

    /**
     * Busca agendamentos por data
     * @param {string} date - Data no formato YYYY-MM-DD
     * @returns {Array} Lista de agendamentos da data
     */
    getAppointmentsByDate: function(date) {
        return this.appointments.filter(apt => apt.date === date);
    },

    /**
     * Verifica se horário está disponível
     * @param {string} date - Data no formato YYYY-MM-DD
     * @param {string} time - Horário no formato HH:MM
     * @returns {boolean} True se disponível
     */
    isTimeAvailable: function(date, time) {
        const existingAppointments = this.getAppointmentsByDate(date);
        return !existingAppointments.some(apt => apt.time === time);
    },

    /**
     * Obtém horários disponíveis para uma data
     * @param {string} date - Data no formato YYYY-MM-DD
     * @returns {Array} Lista de horários disponíveis
     */
    getAvailableTimesForDate: function(date) {
        const bookedTimes = this.getAppointmentsByDate(date).map(apt => apt.time);
        return this.availableHours.filter(time => !bookedTimes.includes(time));
    },

    // ====================================
    // MÉTODOS DE VALIDAÇÃO
    // ====================================
    
    /**
     * Valida número de telefone brasileiro
     * @param {string} phone - Número de telefone
     * @returns {boolean} True se válido
     */
    validatePhone: function(phone) {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return phoneRegex.test(phone);
    },

    /**
     * Valida endereço de email
     * @param {string} email - Endereço de email
     * @returns {boolean} True se válido
     */
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Valida data (não pode ser no passado)
     * @param {string} date - Data no formato YYYY-MM-DD
     * @returns {boolean} True se válida
     */
    validateDate: function(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    },

    /**
     * Valida se é dia útil (segunda a sábado)
     * @param {string} date - Data no formato YYYY-MM-DD
     * @returns {boolean} True se é dia útil
     */
    isWorkingDay: function(date) {
        const dayOfWeek = new Date(date).getDay();
        return dayOfWeek >= 1 && dayOfWeek <= 6; // Segunda(1) a Sábado(6)
    },

    // ====================================
    // MÉTODOS DE FORMATAÇÃO
    // ====================================
    
    /**
     * Formata preço removendo R$
     * @param {string} price - Preço com R$
     * @returns {string} Preço sem R$
     */
    formatPrice: function(price) {
        return price.replace('R$', '').trim();
    },

    /**
     * Formata data para exibição
     * @param {string} date - Data no formato YYYY-MM-DD
     * @returns {string} Data formatada em português
     */
    formatDate: function(date) {
        return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Formata horário para exibição
     * @param {string} time - Horário no formato HH:MM
     * @returns {string} Horário formatado
     */
    formatTime: function(time) {
        return time + 'h';
    },

    /**
     * Formata telefone automaticamente
     * @param {string} phone - Número sem formatação
     * @returns {string} Telefone formatado
     */
    formatPhoneNumber: function(phone) {
        const numbers = phone.replace(/\D/g, '');
        if (numbers.length <= 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
    },

    // ====================================
    // ESTATÍSTICAS E RELATÓRIOS
    // ====================================
    
    /**
     * Obtém estatísticas gerais do sistema
     * @returns {Object} Objeto com estatísticas
     */
    getStats: function() {
        const categories = this.getCategories();
        const totalAppointments = this.appointments.length;
        const todayAppointments = this.getAppointmentsByDate(
            new Date().toISOString().split('T')[0]
        ).length;

        return {
            totalProcedures: this.procedures.length,
            totalCategories: categories.length,
            totalAppointments: totalAppointments,
            todayAppointments: todayAppointments,
            categories: categories,
            mostPopularCategory: this.getMostPopularCategory(),
            averagePrice: this.getAveragePrice()
        };
    },

    /**
     * Obtém categoria mais popular
     * @returns {string} Nome da categoria mais popular
     */
    getMostPopularCategory: function() {
        const categoryCount = {};
        this.procedures.forEach(proc => {
            categoryCount[proc.category] = (categoryCount[proc.category] || 0) + 1;
        });
        
        return Object.keys(categoryCount).reduce((a, b) => 
            categoryCount[a] > categoryCount[b] ? a : b
        );
    },

    /**
     * Calcula preço médio dos procedimentos
     * @returns {string} Preço médio formatado
     */
    getAveragePrice: function() {
        const prices = this.procedures.map(proc => 
            parseFloat(proc.price.replace('R$', '').replace(',', '.'))
        );
        const average = prices.reduce((a, b) => a + b, 0) / prices.length;
        return `R$ ${average.toFixed(2).replace('.', ',')}`;
    },

    // ====================================
    // CONFIGURAÇÕES DO SISTEMA
    // ====================================
    systemConfig: {
        maxAppointmentsPerDay: 8,
        workingDays: [1, 2, 3, 4, 5, 6], // Segunda a Sábado
        holidayDates: [], // Feriados (formato YYYY-MM-DD)
        maintenanceDates: [], // Datas de manutenção
        autoConfirmation: true,
        reminderEnabled: true,
        whatsappIntegration: true,
        emailNotifications: true,
        smsNotifications: false,
        bookingAdvanceDays: 30, // Quantos dias à frente pode agendar
        cancellationHours: 24, // Horas mínimas para cancelamento
        version: "1.0.0",
        lastUpdate: "2024-01-15"
    },

    // ====================================
    // MENSAGENS DO SISTEMA
    // ====================================
    messages: {
        welcome: "Olá! 👋 Bem-vindo à Clínica Bella Estética!",
        appointmentConfirmed: "Agendamento confirmado com sucesso! 🎉",
        appointmentError: "Erro ao agendar. Tente novamente.",
        invalidData: "Por favor, verifique os dados informados.",
        systemError: "Erro no sistema. Contate o suporte.",
        timeUnavailable: "Horário não disponível. Escolha outro.",
        dateInvalid: "Data inválida. Selecione uma data futura.",
        phoneInvalid: "Telefone inválido. Use o formato (00) 00000-0000",
        emailInvalid: "Email inválido. Verifique o formato.",
        fieldRequired: "Este campo é obrigatório.",
        success: "Operação realizada com sucesso!",
        loading: "Carregando...",
        noResults: "Nenhum resultado encontrado.",
        connectionError: "Erro de conexão. Tente novamente."
    },

    // ====================================
    // MÉTODOS DE PERSISTÊNCIA
    // ====================================
    
    /**
     * Salva dados no localStorage
     */
    saveToStorage: function() {
        try {
            localStorage.setItem('bellaClinic_appointments', JSON.stringify(this.appointments));
            localStorage.setItem('bellaClinic_lastUpdate', new Date().toISOString());
        } catch (error) {
            console.warn('Erro ao salvar no localStorage:', error);
        }
    },

    /**
     * Carrega dados do localStorage
     */
    loadFromStorage: function() {
        try {
            const savedAppointments = localStorage.getItem('bellaClinic_appointments');
            if (savedAppointments) {
                this.appointments = JSON.parse(savedAppointments);
            }
        } catch (error) {
            console.warn('Erro ao carregar do localStorage:', error);
            this.appointments = [];
        }
    },

    /**
     * Limpa dados salvos
     */
    clearStorage: function() {
        try {
            localStorage.removeItem('bellaClinic_appointments');
            localStorage.removeItem('bellaClinic_lastUpdate');
            this.appointments = [];
        } catch (error) {
            console.warn('Erro ao limpar localStorage:', error);
        }
    },

    // ====================================
    // MÉTODOS DE INICIALIZAÇÃO
    // ====================================
    
    /**
     * Inicializa o sistema de dados
     */
    init: function() {
        this.loadFromStorage();
        console.log('📊 DataManager inicializado com sucesso!');
        console.log(`📋 ${this.procedures.length} procedimentos carregados`);
        console.log(`🏥 Clínica: ${this.clinicData.name}`);
        console.log(`📅 ${this.appointments.length} agendamentos carregados`);
    }
};

// ====================================
// EXPORTAR PARA USO GLOBAL
// ====================================
window.DataManager = DataManager;

// ====================================
// INICIALIZAÇÃO AUTOMÁTICA
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    DataManager.init();
});

// ====================================
// LOG DE CARREGAMENTO
// ====================================
console.log('🔧 shared-data.js carregado com sucesso!');
console.log('📊 DataManager disponível globalmente');
console.log('🏥 Sistema da Clínica Bella Estética v' + DataManager.systemConfig.version);
