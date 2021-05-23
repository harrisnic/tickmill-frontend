<template>
    <tr>
        <td style="width:8%;">{{ transaction.id }}</td>
        <td style="width:12%;">{{ transaction.amount }}</td>
        <td style="width:20%;">{{ transaction.client_name }}</td>
        <td style="width:25%;">{{ transaction.created_at }}</td>
        <td style="width:25%;">{{ transaction.updated_at }}</td>
        <td>
            <router-link :to="{name: 'admin.edit-transaction', params: { id: transaction.id }}">
                <b-icon-pencil-fill></b-icon-pencil-fill> Edit
            </router-link>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "TransactionListItem",
        props: {
            transaction: Object,
        },
        data() {
            return {

            }
        },

        methods: {
        }
    }
</script>
