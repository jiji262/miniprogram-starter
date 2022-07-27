Component({
    options: {
        multipleSlots: true,
        addGlobalClass: true,
    },
    properties: {
        title: {
            type: String,
            default: '',
        },
        desc: {
            type: String,
            default: '',
        },
        padding: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
    },
});

