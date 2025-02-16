import { Relationship } from "./common"

type RewardStatus = "Sent" | "Rejected"

export interface Reward {
    /**
     * Identifier of the reward resource.
     */
    id: string

    /**
     * Type of the reward resource. The value is always reward.
     */
    type: "reward"

    /**
     * JSON object representing the reward data.
     */
    attributes: {
        /**
         * The date the reward was created.
         * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
         */
        createdAt: string

        /**
         * The amount (in cents) of the reward.
         */
        amount: number

        /**
         * Description of the reward.
         */
        description: string

        /**
         * Either Sent or Rejected (see rejectReason for details).
         */
        status: RewardStatus

        /**
         * Optional. More information about the status.
         */
        rejectReason: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags?: object
    }

    /**
     * Describes relationships between the reward resource and other resources (accounts, transaction, customer).
     */
    relationships: {
        /**
         * The account that received the funds.
         */
        receivingAccount: Relationship

        /**
         * The account that sent the funds.
         */
        fundingAccount: Relationship

        /**
         * Optional. The transaction that caused the reward.
         */
        rewardedTransaction?: Relationship

        /**
         * The [Customer](https://developers.unit.co/customers/) the deposit account belongs to.
         */
        customer: Relationship

        /**
         * The [Reward Transaction](https://developers.unit.co/resources/#transaction-reward) generated by the reward.
         */
        transaction: Relationship

        /**
         * Optional. The card the belongs to the rewardedTransaction (if exists)
         */
        card?: Relationship
    }
}

export interface CreateRewardRequest {
    type: "reward"

    attributes: {
        /**
         * The amount (in cents) to reward the account.
         */
        amount: number

        /**
         * Description of the reward (maximum of 50 characters).
         */
        description: string

        /**
         * See [Tags](https://developers.unit.co/#tags).
         */
        tags?: object

        /**
         * See [Idempotency](https://developers.unit.co/#intro-idempotency).
         */
        idempotencyKey?: string
    }

    relationships: {
        /**
         * The account that will receive the reward.
         */
        receivingAccount: Relationship

        /**
         * Optional. The account that will fund the reward, default is the revenue account.
         */
        fundingAccount?: Relationship

        /**
         * Optional. The transaction that triggered the reward (mostly relevant for cashback rewards).
         */
        rewardedTransaction?: Relationship
    }
}

export interface RewardListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number

    /**
     * Number of resources to skip. See Pagination.
     * default: 0
     */
    offset?: number

    /**
     * Optional. Filters the results by the specified transaction id.
     */
    transactionId?: string

    /**
     * Optional. Filters the results by the specified rewarded transaction id.
     */
    rewardedTransactionId?: string

    /**
     * Optional. Filters the results by the specified account id.
     */
    receivingAccountId?: string

    /**
     * Optional. Filters the results by the specified customer id.
     */
    customerId?: string

    /**
     * Optional. Filters the results by the specified card id.
     */
    cardId?: string

    /**
     * Optional. Filter by reward Status. Usage example: filter[status][0]=Rejected.
     */
    status?: string[]

    /**
     * Optional. Filters the rewards that occurred after the specified date. e.g. 2020-01-13T16:01:19.346Z
     */
    since?: string

    /**
     * Optional. Filters the rewards that occurred before the specified date. e.g. 2020-01-02T20:06:23.486Z
     */
    until?: string

    /**
     * Optional. Filter rewards by [Tags](https://developers.unit.co/#tags).
     */
    tags?: object

    /**
     * Optional. Leave empty or provide sort = createdAt for ascending order.Provide sort = -createdAt(leading minus sign) for descending order.
     * default: sort=-createdAt
     */
    sort?: string

    /**
    * Optional. A comma-separated list of related resources to include in the response.
    * Related resources include: customer, account. [See Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
    */
    include?: string
}