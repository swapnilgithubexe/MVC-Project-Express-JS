// Export a middleware function named setLastVisit
export const setLastVisit = (req, res, next) => {
  // Check if a 'lastVisit' cookie exists in the request
  if (req.cookies.lastVisit) {
    // If the cookie exists, parse its value as a Date object
    // and convert it to a localized string representation
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  }

  // Set a new 'lastVisit' cookie with the current date and time
  res.cookie("lastVisit", new Date().toISOString(), {
    // Set the cookie to expire after 2 days
    // 2 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    maxAge: 2 * 24 * 60 * 60 * 1000
  });

  // Call the next middleware function in the chain
  next();
};