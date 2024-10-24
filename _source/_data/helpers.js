export default function(){
  return {
    currentYear: () => {
      const today = new Date();
      return today.getFullYear();
    }
  }
} 