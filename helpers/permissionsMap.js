export const PERMISSIONS = {
    PERMISSIONS: {
        VIEW: "view_permissions",
        CREATE: "create_permission",
        UPDATE: "update_permission",
        DELETE: "delete_permission",
        ASSIGN: "assign_permissions",
    },
    DASHBOARD: {
        VIEW: "view_dashboard",
    },
    USERS: {
        VIEW: "view_users",
        CREATE: "create_user",
        UPDATE: "update_user",
        DELETE: "delete_user",
    },
    KYC: {
        APPROVE: "approve_kyc",
        REJECT: "reject_kyc",
        VIEW: "view_kyc",
        REVIEW: "review_kyc",
        VIEW_KYC_DOCUMENTS: "view_kyc_documents",
        DOCUMENTS: {
            VIEW: "view_kyc_documents",
            CREATE: "create_kyc_document",
            UPDATE: "update_kyc_document",
            DELETE: "delete_kyc_document",
        }
    },
    INVESTMENTS: {
        VIEW: "view_investments", 
        REVIEW: "review_investments",
    },
    INVESTORS: {
      VIEW: "view_investors",
      VIEW_INVESTMENTS: "view_investors_investments",
      VIEW_TRANSACTIONS: "view_investors_transactions",
      VIEW_PROFILE: "view_investors_profile",
    },
    TRANSACTIONS:{
      VIEW: "view_transactions",
      REVIEW: "review_transactions",
      VIEW_DEPOSITS: "view_transactions_deposits",
      VIEW_WITHDRAWALS: "view_transactions_withdrawals",
      VIEW_TRANSACTION_INFO: "view_transactions_info",
      APPROVE_WITHDRAWAL: "approve_withdrawal",
      REJECT_WITHDRAWAL: "reject_withdrawal",
      APPROVE_DEPOSIT: "approve_deposit",
      REJECT_DEPOSIT: "reject_deposit",
    },
    PLANS:{
      VIEW: "view_plans",
      CREATE: "create_plan",
      UPDATE: "update_plan",

    }
};
