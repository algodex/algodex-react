export const truncateAddress = (addr) => {
  return `${addr.substr(0, 4)}...${addr.substr(addr.length - 4)}`
}
