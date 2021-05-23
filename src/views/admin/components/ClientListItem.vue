<template>
    <tr>
        <td style="width:2%;">{{ client.id }}</td>
        <td style="width:6%;">
            <template v-if="client.avatar">
                <img width="60" :src="getAvatarUrl" :alt="client.first_name + ' ' +  client.last_name">
            </template>
            <template v-else>
                <img width="60" src="@/assets/images/default-avatar.jpg" alt="default avatar">
            </template>
        </td>
        <td style="width:14%;">{{ client.first_name + ' ' +  client.last_name }}</td>
        <td style="width:15%;">{{ client.created_at }}</td>
        <td style="width:15%;">{{ client.updated_at }}</td>
        <td style="width:10%;">
            <b-button size="sm" :to="{name: 'admin.edit-client', params: { id: client.id }}" variant="outline-primary">
                <b-icon-pencil-fill></b-icon-pencil-fill> Edit
            </b-button>
        </td>
        <td style="width:10%;">
            <b-button size="sm" :to="{name: 'admin.upload-avatar', params: { id: client.id }}" variant="outline-primary">
                <b-icon-upload></b-icon-upload> Avatar
            </b-button>
        </td>
        <td style="width:14%;">
            <b-button size="sm" :to="{name: 'admin.add-transaction', params: { id: client.id }}" variant="outline-success">
                <b-icon-plus-circle></b-icon-plus-circle> Transaction
            </b-button>
        </td>
        <td style="width:14%;">
            <b-button size="sm" :to="{name: 'admin.client-transactions', params: { id: client.id }}" variant="outline-success">
                <b-icon-eye></b-icon-eye> Transactions
            </b-button>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "ClientListItem",
        props: {
            client: Object,
        },
        computed: {
            getAvatarUrl() {
                return this.$coreUrl + '/uploads/' + this.client.avatar;
            },
        },
    }
</script>
