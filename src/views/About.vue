<script>
export default {
  name: "AboutView",
};
</script>

<template>
  <div class="about">
    <h1>Hi!</h1>
    <p>
      I'm Ira, an illustrator based in Kyiv, Ukraine, who is passionate about
      character design and storytelling.
    </p>
    <p>
      I enjoy diving headfirst into projects, exploring, and creating vibrant
      artworks which tell stories and spark joy.
    </p>
    <p>
      Previously worked in various fields like editorial, advertising, and
      social media.
    </p>
    <p>
      Aside from work, I love having fun with my dog, reading books, and
      exploring new things.
    </p>
    <p>
      If you wanna collaborate, have any questions, or just wanna say hi, hit me
      up at
      <a href="mailto:iryna.lisogor.artwrk@gmail.com"
        >iryna.lisogor.artwrk@gmail.com</a
      >
    </p>
  </div>
</template>

<style lang="scss" scoped>
.about {
  max-width: 700px;
  margin-inline: auto;
  /* text-align: justify; */

  h1 {
    font-weight: 600;
    color: var(--color-primary);
  }

  p {
    font-size: 24px;
    margin-top: 14px;
  }

  a {
    font-weight: 500;
  }
}
</style>
