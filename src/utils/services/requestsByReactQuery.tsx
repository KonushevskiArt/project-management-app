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
// const {
//   isLoading: isLoading2,
//   data: response2,
//   error: error2,
//   refetch: refetch4,
// } = useQuery('create board', () => BoardService.createBoard("Artem's board"), {
//   enabled: false,
// });

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
// const {
//   isLoading,
//   data: response,
//   error,
//   refetch: refetch3,
// } = useQuery('create column', () => ColumnService.createColumn(idMyBoard, newColumn), {
//   enabled: false,
// });

// delete column
// const {
//   isLoading,
//   data: response,
//   error,
//   refetch: refetch3,
// } = useQuery('create column', () => ColumnService.deleteColumnById(idMyBoard, newColumnId), {
//   enabled: false,
// });

export const someThing = () => {
  console.log('df');
};
