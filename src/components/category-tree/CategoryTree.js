import './CategoryTree.css'
import {TreeItem, TreeView} from "@material-ui/lab";
import {alpha, Collapse, makeStyles, SvgIcon, withStyles} from "@material-ui/core";
import {animated, useSpring} from "react-spring";
import PropTypes from "prop-types";

const MinusSquare = (props) => {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14, color: '#f50057' }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

const PlusSquare = (props) => {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14, color: '#f50057' }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

const CloseSquare = (props) => {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

const TransitionComponent = (props) => {
    const style = useSpring({
        from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
        to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

TransitionComponent.propTypes = {
    /**
     * Show the component; triggers the enter or exit states
     */
    in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}))((props) =>
    <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
});


const CategoryTree = ({treeData, onSelectCategory}) => {
    const classes = useStyles();

    const handleClickOnTreeItem = (level) => {
        onSelectCategory(level)
    }

  return <div>
      <TreeView
          className={classes.root}
          /*defaultExpanded={[treeData[0]['categoryId']]}*/
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<div />}
      >
          {
              treeData.map((l1, il1) => {
                  return <StyledTreeItem key={l1.categoryId} nodeId={l1.categoryId} label={l1.categoryName} onClick={() => handleClickOnTreeItem(l1)}>
                      {!!l1.children
                          ? l1.children.map((l2, il2) =>
                              <StyledTreeItem key={l2.categoryId} nodeId={l2.categoryId} label={l2.categoryName} onClick={() => handleClickOnTreeItem(l2)}>
                                  {!!l2.children ? l2.children.map((l3, il3) => <StyledTreeItem key={l3.categoryId} nodeId={l3.categoryId} label={l3.categoryName} onClick={() => handleClickOnTreeItem(l3)}>
                                      {!!l3.children ? l3.children.map((l4, il4) => <StyledTreeItem key={l4.categoryId} nodeId={l4.categoryId} label={l4.categoryName} ></StyledTreeItem>) : ''}
                                  </StyledTreeItem>) : ''}
                              </StyledTreeItem>) : ''
                      }
                  </StyledTreeItem>
              })
          }

      </TreeView>
  </div>
}

export default CategoryTree