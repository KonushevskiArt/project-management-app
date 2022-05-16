//sign up
// const {
//   // isLoading,
//   // data: response,
//   refetch,
// } = useQuery(['signup', user], () => AuthService.signUp(user), {
//   onError: ({ error }) => {
//     console.log(error);
//   },
//   enabled: false,
//   // select: ({ data }) => {
//   //   console.log(data);
//   //   return data;
//   // },
// });

//sing in
// const {
//   // isLoading,
//   // data: response,
//   refetch: refetch1,
// } = useQuery(['signin', userSignIn], () => AuthService.signIn(userSignIn), {
//   onSuccess: ({ data }) => {
//     localStorage.setItem('token', data.token);
//   },
//   enabled: false,
// });

// get user by id
// const {
//   isLoading,
//   data: response,
//   error,
//   refetch: refetch3,
// } = useQuery('getAll', () => UserService.getUserById(myId), {
//   enabled: false,
// });

//get all boards
// const {
//   isLoading,
//   data: response,
//   error,
//   refetch: refetch3,
// } = useQuery('getAll', () => BoardService.getAll(), {
//   enabled: false,
// });

//create board
//.........
//.........

//get board by id
// const {
//   isLoading,
//   data: response,
//   error,
//   refetch: refetch3,
// } = useQuery('getAll', () => BoardService.getBoardById(idMyBoard), {
//   enabled: false,
// });

// get all columns
// const {
//   isLoading,
//   data: response,
//   error,
//   refetch: refetch3,
// } = useQuery('create column', () => ColumnService.getAll(idMyBoard), {
//   enabled: false,
// });

// create column
// const { mutate } = useMutation(
//   'add new column',
//   (newColumn: INewColumn) => {
//     return ColumnService.createColumn(boardId, newColumn);
//   },
//   {
//     onError: (error: Error) => {

//     },
//     onSuccess: ({ data }: AxiosResponse<IResponseNewColumn>) => {

//     },
//   }
// );
//
// mutate() -- some where.

// delete column
// const { mutate, isLoading } = useMutation(
//   'delete column' + id,
//   () => ColumnService.deleteColumnById(boardId, id),
//   {
//     onError: (error: Error) => {

//     },
//     onSuccess: () => {

//     },
//   }
// );
// mutate() --- somewhere by click

export const someThing = () => {
  console.log('df');
};
