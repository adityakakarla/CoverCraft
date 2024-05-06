import {clerkClient} from '@clerk/nextjs/server';

export async function getIdFromEmail(email: string){
    const emailAddress = [email];

    const {data, totalCount} = await clerkClient.users.getUserList({emailAddress})
    
    if(totalCount == 0){
        return 'No id found'
    } else if (totalCount > 1){
        return 'Multiple ids found'
    } else {
        return data[0].id;
    }
}
