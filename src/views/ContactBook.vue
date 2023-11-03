
import ContactList from '../components/ContactList.vue';

<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh ba
                <i class="fas fa-address-book"></i>
            </h4>
            <ContactList
                v-if="filteredContactsCount > 0"
                :contacts="filteredContacts"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Khong co lien he nao</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refereshList()">
                    <i class="fas fa-redo"></i> Lam moi
                </button>

                <button class="btn btn-sm btn-success" @click="goToAddContact">
                    <i class="fas fa-plus"></i> Them moi
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllContacts"
                >
                    <i class="fas fa-trash"></i> Xoa tat ca
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeContact">
                <h4>
                    Chi tiet Lien he
                    <i class="fas fa-address-card"></i>
                </h4>
                <ContactCard :contact="activeContact" />
            </div>
        </div>
    </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
    conmpnents: {
        ContactCard,
        InputSearch,
        ContactList,
    },
    // Doan ma xu ly day du se trinh bay ben duoi
    data() {
        return {
            contacts: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giam sat cac thay doi cua bien searchText
        //Bo chon phan tu dang duoc chon trong danh sach
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyen cac doi tuong contact thanh chuoi de tien cho tim kiem
        contactString() {
            return this.contacts.map((contact) => {
                const { name, email, address, phone } = contact;
                return [name, email, address, phone].join("");
            });
        },
        //Tra ve cac contact co chua thong tin can tim kiem
        filterdContacts() {
            if (!this.searchText) return this.contacts;
            return this.contact.filter((_contact, index) => this.contactStrings[index].includes(this.searchText));
        },
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex];
        },
        filteredContactCount() {
            return this.filteredContacts.length;
        },
    },
    methods: {
        async retrieveContacts() {
            try {
                this.contacts = await ContactService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        },

        async removeAllContacts() {
            if (confirm("Ban muon xoa tat ca Lien he?")) {
                try {
                    await ContactService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddContact() {
            this.$router.push({ name: "contact.add" });
        },
    },    
    mounted() {
        this.refreshList();
    },
};   
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>