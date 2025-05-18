export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  date: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "records" */
  delete_records?: Maybe<Records_Mutation_Response>;
  /** delete single row from the table: "records" */
  delete_records_by_pk?: Maybe<Records>;
  /** insert data into the table: "records" */
  insert_records?: Maybe<Records_Mutation_Response>;
  /** insert a single row into the table: "records" */
  insert_records_one?: Maybe<Records>;
  /** update data of the table: "records" */
  update_records?: Maybe<Records_Mutation_Response>;
  /** update single row of the table: "records" */
  update_records_by_pk?: Maybe<Records>;
  /** update multiples rows of table: "records" */
  update_records_many?: Maybe<Array<Maybe<Records_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_RecordsArgs = {
  where: Records_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Records_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootInsert_RecordsArgs = {
  objects: Array<Records_Insert_Input>;
  on_conflict?: InputMaybe<Records_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Records_OneArgs = {
  object: Records_Insert_Input;
  on_conflict?: InputMaybe<Records_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_RecordsArgs = {
  _set?: InputMaybe<Records_Set_Input>;
  where: Records_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Records_By_PkArgs = {
  _set?: InputMaybe<Records_Set_Input>;
  pk_columns: Records_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Records_ManyArgs = {
  updates: Array<Records_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  records: Array<Records>;
  /** fetch data from the table: "records" using primary key columns */
  records_by_pk?: Maybe<Records>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootRecordsArgs = {
  distinct_on?: InputMaybe<Array<Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Records_Order_By>>;
  where?: InputMaybe<Records_Bool_Exp>;
};


export type Query_RootRecords_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** columns and relationships of "records" */
export type Records = {
  __typename?: 'records';
  id: Scalars['Int']['output'];
  owned_by: Scalars['String']['output'];
  played_at: Scalars['date']['output'];
  sgf_text: Scalars['String']['output'];
  /** An object relationship */
  user: Users;
};

/** order by aggregate values of table "records" */
export type Records_Aggregate_Order_By = {
  avg?: InputMaybe<Records_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Records_Max_Order_By>;
  min?: InputMaybe<Records_Min_Order_By>;
  stddev?: InputMaybe<Records_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Records_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Records_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Records_Sum_Order_By>;
  var_pop?: InputMaybe<Records_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Records_Var_Samp_Order_By>;
  variance?: InputMaybe<Records_Variance_Order_By>;
};

/** order by avg() on columns of table "records" */
export type Records_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "records". All fields are combined with a logical 'AND'. */
export type Records_Bool_Exp = {
  _and?: InputMaybe<Array<Records_Bool_Exp>>;
  _not?: InputMaybe<Records_Bool_Exp>;
  _or?: InputMaybe<Array<Records_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  owned_by?: InputMaybe<String_Comparison_Exp>;
  played_at?: InputMaybe<Date_Comparison_Exp>;
  sgf_text?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "records" */
export enum Records_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecordsPk = 'records_pk'
}

/** input type for inserting data into table "records" */
export type Records_Insert_Input = {
  played_at?: InputMaybe<Scalars['date']['input']>;
  sgf_text?: InputMaybe<Scalars['String']['input']>;
};

/** order by max() on columns of table "records" */
export type Records_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  owned_by?: InputMaybe<Order_By>;
  played_at?: InputMaybe<Order_By>;
  sgf_text?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "records" */
export type Records_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  owned_by?: InputMaybe<Order_By>;
  played_at?: InputMaybe<Order_By>;
  sgf_text?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "records" */
export type Records_Mutation_Response = {
  __typename?: 'records_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Records>;
};

/** on_conflict condition type for table "records" */
export type Records_On_Conflict = {
  constraint: Records_Constraint;
  update_columns?: Array<Records_Update_Column>;
  where?: InputMaybe<Records_Bool_Exp>;
};

/** Ordering options when selecting data from "records". */
export type Records_Order_By = {
  id?: InputMaybe<Order_By>;
  owned_by?: InputMaybe<Order_By>;
  played_at?: InputMaybe<Order_By>;
  sgf_text?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: records */
export type Records_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "records" */
export enum Records_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  OwnedBy = 'owned_by',
  /** column name */
  PlayedAt = 'played_at',
  /** column name */
  SgfText = 'sgf_text'
}

/** input type for updating data in table "records" */
export type Records_Set_Input = {
  played_at?: InputMaybe<Scalars['date']['input']>;
  sgf_text?: InputMaybe<Scalars['String']['input']>;
};

/** order by stddev() on columns of table "records" */
export type Records_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "records" */
export type Records_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "records" */
export type Records_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "records" */
export type Records_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Records_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Records_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  owned_by?: InputMaybe<Scalars['String']['input']>;
  played_at?: InputMaybe<Scalars['date']['input']>;
  sgf_text?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "records" */
export type Records_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "records" */
export enum Records_Update_Column {
  /** column name */
  PlayedAt = 'played_at',
  /** column name */
  SgfText = 'sgf_text'
}

export type Records_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Records_Set_Input>;
  /** filter the rows which have to be updated */
  where: Records_Bool_Exp;
};

/** order by var_pop() on columns of table "records" */
export type Records_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "records" */
export type Records_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "records" */
export type Records_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  records: Array<Records>;
  /** fetch data from the table: "records" using primary key columns */
  records_by_pk?: Maybe<Records>;
  /** fetch data from the table in a streaming manner: "records" */
  records_stream: Array<Records>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootRecordsArgs = {
  distinct_on?: InputMaybe<Array<Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Records_Order_By>>;
  where?: InputMaybe<Records_Bool_Exp>;
};


export type Subscription_RootRecords_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootRecords_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Records_Stream_Cursor_Input>>;
  where?: InputMaybe<Records_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  records: Array<Records>;
};


/** columns and relationships of "users" */
export type UsersRecordsArgs = {
  distinct_on?: InputMaybe<Array<Records_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Records_Order_By>>;
  where?: InputMaybe<Records_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  records?: InputMaybe<Records_Bool_Exp>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  records_aggregate?: InputMaybe<Records_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

export type SelectRecordsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type SelectRecordsQuery = { __typename?: 'query_root', users_by_pk?: { __typename?: 'users', records: Array<{ __typename?: 'records', id: number, played_at: any, sgf_text: string }> } | null };

export type InsertRecordMutationVariables = Exact<{
  playedAt: Scalars['date']['input'];
  sgfText: Scalars['String']['input'];
}>;


export type InsertRecordMutation = { __typename?: 'mutation_root', insert_records_one?: { __typename?: 'records', id: number } | null };

export type DeleteRecordMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteRecordMutation = { __typename?: 'mutation_root', delete_records_by_pk?: { __typename?: 'records', id: number } | null };

export type SelectUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type SelectUserQuery = { __typename?: 'query_root', users_by_pk?: { __typename?: 'users', id: string, name: string } | null };
