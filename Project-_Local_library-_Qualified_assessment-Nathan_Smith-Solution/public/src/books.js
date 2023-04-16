function findAuthorById(authors, id) {
  const found = authors.find((author) => author.id === id);
  return found;
}

function findBookById(books, id) {
  const found = books.find((book) => book.id === id);
  return found;
}

function partitionBooksByBorrowedStatus(books) {
  const returned = books.filter((book) => book.borrows[0].returned === false);
  const borrowed = books.filter((book) => book.borrows[0].returned === true);

  const partitioned = [returned, borrowed];

  return partitioned;
}

function getBorrowersForBook(book, accounts) {
  const borrowerDetails = [];

  for (let i = 0; i < book.borrows.length; i++) {
    if (borrowerDetails.length < 10) {
      let borrowId = book.borrows[i].id;
      if (accounts.some((accountObject) => accountObject.id === borrowId)) {
        let index = accounts.findIndex(
          (accountItem) => accountItem.id === borrowId
        );
        let account = accounts[index];
        let returnedBook = true;
        if (book.borrows[i].length > 0) {
          returnedBook = book.borrows[i].returned;
        } else {
          returnedBook = true;
        }

        let borrower = account;

        borrower.returned = returnedBook;

        borrowerDetails.push(borrower);
      }
    }
  }
  return borrowerDetails;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
